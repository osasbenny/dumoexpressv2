// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var parcels = mysqlTable("parcels", {
  id: int("id").autoincrement().primaryKey(),
  trackingNumber: varchar("trackingNumber", { length: 32 }).notNull().unique(),
  senderName: varchar("senderName", { length: 255 }).notNull(),
  senderPhone: varchar("senderPhone", { length: 20 }).notNull(),
  senderAddress: text("senderAddress").notNull(),
  receiverName: varchar("receiverName", { length: 255 }).notNull(),
  receiverPhone: varchar("receiverPhone", { length: 20 }).notNull(),
  receiverAddress: text("receiverAddress").notNull(),
  weight: varchar("weight", { length: 20 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["same-day", "next-day", "scheduled", "bulk"]).notNull(),
  status: mysqlEnum("status", ["collected", "in-transit", "out-for-delivery", "delivered"]).default("collected").notNull(),
  estimatedDelivery: timestamp("estimatedDelivery"),
  actualDelivery: timestamp("actualDelivery"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var parcelStatusHistory = mysqlTable("parcelStatusHistory", {
  id: int("id").autoincrement().primaryKey(),
  parcelId: int("parcelId").notNull(),
  status: mysqlEnum("status", ["collected", "in-transit", "out-for-delivery", "delivered"]).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});
var bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  bookingRef: varchar("bookingRef", { length: 32 }).notNull().unique(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  pickupAddress: text("pickupAddress").notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  packageWeight: varchar("packageWeight", { length: 20 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["same-day", "next-day", "scheduled", "bulk"]).notNull(),
  scheduledDate: timestamp("scheduledDate"),
  specialInstructions: text("specialInstructions"),
  status: mysqlEnum("bookingStatus", ["pending", "confirmed", "picked-up", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var contactInquiries = mysqlTable("contactInquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("inquiryStatus", ["new", "read", "replied", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getParcelByTrackingNumber(trackingNumber) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(parcels).where(eq(parcels.trackingNumber, trackingNumber)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getParcelStatusHistory(parcelId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(parcelStatusHistory).where(eq(parcelStatusHistory.parcelId, parcelId)).orderBy(desc(parcelStatusHistory.timestamp));
}
async function createParcel(parcel) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const trackingNumber = `DE${nanoid(10).toUpperCase()}`;
  await db.insert(parcels).values({ ...parcel, trackingNumber });
  const newParcel = await getParcelByTrackingNumber(trackingNumber);
  if (newParcel) {
    await addParcelStatusHistory({
      parcelId: newParcel.id,
      status: "collected",
      location: "DumoExpress Hub",
      description: "Parcel collected and registered in system"
    });
  }
  return trackingNumber;
}
async function addParcelStatusHistory(history) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(parcelStatusHistory).values(history);
  if (history.parcelId) {
    await db.update(parcels).set({ status: history.status }).where(eq(parcels.id, history.parcelId));
  }
}
async function getAllParcels() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(parcels).orderBy(desc(parcels.createdAt));
}
async function createBooking(booking) {
  const db = await getDb();
  const bookingRef = `DES${nanoid(8).toUpperCase()}`;
  if (db) {
    try {
      await db.insert(bookings).values({ ...booking, bookingRef });
    } catch (error) {
      console.error("[Database] Failed to save booking:", error);
    }
  }
  try {
    const trackingDataPath = path.resolve(process.cwd(), "client", "public", "tracking-data.json");
    const distTrackingDataPath = path.resolve(process.cwd(), "dist", "public", "tracking-data.json");
    let data = { shipments: [] };
    if (fs.existsSync(trackingDataPath)) {
      const content = fs.readFileSync(trackingDataPath, "utf-8");
      data = JSON.parse(content);
    }
    const serviceMap = {
      "same-day": "Same-Day Delivery",
      "next-day": "Next-Day Delivery",
      "scheduled": "Scheduled Pickup",
      "bulk": "Bulk Shipment"
    };
    const now = /* @__PURE__ */ new Date();
    const estDelivery = /* @__PURE__ */ new Date();
    estDelivery.setDate(now.getDate() + 3);
    const newShipment = {
      trackingNumber: bookingRef,
      sender: {
        name: booking.customerName,
        location: booking.pickupAddress
      },
      receiver: {
        name: "To be assigned",
        address: booking.deliveryAddress
      },
      package: {
        description: "New Booking",
        weight: booking.packageWeight
      },
      serviceType: serviceMap[booking.serviceType] || booking.serviceType,
      status: "Collected",
      createdAt: now.toISOString(),
      estimatedDelivery: estDelivery.toISOString(),
      history: [
        {
          status: "Collected",
          timestamp: now.toISOString(),
          location: "Online Booking",
          description: "Shipment created via online booking"
        }
      ]
    };
    data.shipments.push(newShipment);
    const updatedContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(trackingDataPath, updatedContent);
    if (fs.existsSync(path.dirname(distTrackingDataPath))) {
      fs.writeFileSync(distTrackingDataPath, updatedContent);
    }
    console.log(`[Storage] Booking ${bookingRef} saved to tracking-data.json`);
  } catch (error) {
    console.error("[Storage] Failed to save to tracking-data.json:", error);
  }
  return bookingRef;
}
async function getBookingByRef(bookingRef) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(bookings).where(eq(bookings.bookingRef, bookingRef)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
}
async function updateBookingStatus(bookingRef, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(bookings).set({ status }).where(eq(bookings.bookingRef, bookingRef));
}
async function createContactInquiry(inquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactInquiries).values(inquiry);
  return Number(result[0].insertId);
}
async function getAllContactInquiries() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}
async function updateInquiryStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactInquiries).set({ status }).where(eq(contactInquiries.id, id));
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { z as z2 } from "zod";

// server/_core/email.ts
import nodemailer from "nodemailer";
var SMTP_CONFIG = {
  host: "mail.dumoexpress.com",
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: "info@dumoexpress.com",
    pass: "s#009V72(Byn]{p["
  }
};
var transporter = nodemailer.createTransport(SMTP_CONFIG);
transporter.verify(function(error, success) {
  if (error) {
    console.error("[Email] SMTP connection error:", error);
  } else {
    console.log("[Email] SMTP server is ready to send emails");
  }
});
async function sendEmail(options) {
  try {
    const mailOptions = {
      from: '"DumoExpress" <info@dumoexpress.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text.replace(/\n/g, "<br>")
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("[Email] Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}
async function sendBookingNotification(data) {
  const subject = `New Booking Request - ${data.bookingRef}`;
  const text2 = `
New Booking Request - ${data.bookingRef}

Customer Information:
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

Shipment Details:
Service Type: ${data.serviceType.toUpperCase()}
Package Weight: ${data.packageWeight}
Pickup Address: ${data.pickupAddress}
Delivery Address: ${data.deliveryAddress}
${data.scheduledDate ? `Scheduled Date: ${data.scheduledDate}` : ""}
${data.specialInstructions ? `Special Instructions: ${data.specialInstructions}` : ""}

Booking Reference: ${data.bookingRef}
Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
  `.trim();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">New Booking Request - ${data.bookingRef}</h2>
      
      <h3 style="color: #333;">Customer Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerEmail}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerPhone}</td></tr>
      </table>
      
      <h3 style="color: #333; margin-top: 20px;">Shipment Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.serviceType.toUpperCase()}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Package Weight:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.packageWeight}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pickup Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.pickupAddress}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Delivery Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.deliveryAddress}</td></tr>
        ${data.scheduledDate ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Scheduled Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.scheduledDate}</td></tr>` : ""}
        ${data.specialInstructions ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Special Instructions:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.specialInstructions}</td></tr>` : ""}
      </table>
      
      <p style="margin-top: 20px; padding: 15px; background-color: #f0f8ff; border-left: 4px solid #0066cc;">
        <strong>Booking Reference:</strong> ${data.bookingRef}<br>
        <strong>Submitted:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
      </p>
    </div>
  `;
  return await sendEmail({
    to: "info@dumoexpress.com",
    subject,
    text: text2,
    html
  });
}
async function sendContactNotification(data) {
  const emailSubject = `Contact Inquiry: ${data.subject}`;
  const text2 = `
New Contact Inquiry

From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
Subject: ${data.subject}

Message:
${data.message}

Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
  `.trim();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">New Contact Inquiry</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>From:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td></tr>` : ""}
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.subject}</td></tr>
      </table>
      
      <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; margin-bottom: 20px;">
        <h3 style="color: #333; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <p style="color: #666; font-size: 12px;">
        Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}
      </p>
    </div>
  `;
  return await sendEmail({
    to: "info@dumoexpress.com",
    subject: emailSubject,
    text: text2,
    html
  });
}

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  // Parcel Tracking Router
  tracking: router({
    // Public: Track a parcel by tracking number
    track: publicProcedure.input(z2.object({ trackingNumber: z2.string().min(1) })).query(async ({ input }) => {
      const parcel = await getParcelByTrackingNumber(input.trackingNumber.toUpperCase());
      if (!parcel) {
        return { found: false, parcel: null, history: [] };
      }
      const history = await getParcelStatusHistory(parcel.id);
      return { found: true, parcel, history };
    }),
    // Admin: Get all parcels
    list: protectedProcedure.query(async () => {
      return await getAllParcels();
    }),
    // Admin: Create a new parcel
    create: protectedProcedure.input(z2.object({
      senderName: z2.string().min(1),
      senderPhone: z2.string().min(1),
      senderAddress: z2.string().min(1),
      receiverName: z2.string().min(1),
      receiverPhone: z2.string().min(1),
      receiverAddress: z2.string().min(1),
      weight: z2.string().min(1),
      serviceType: z2.enum(["same-day", "next-day", "scheduled", "bulk"]),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const trackingNumber = await createParcel(input);
      return { trackingNumber };
    }),
    // Admin: Update parcel status
    updateStatus: protectedProcedure.input(z2.object({
      parcelId: z2.number(),
      status: z2.enum(["collected", "in-transit", "out-for-delivery", "delivered"]),
      location: z2.string().optional(),
      description: z2.string().optional()
    })).mutation(async ({ input }) => {
      await addParcelStatusHistory({
        parcelId: input.parcelId,
        status: input.status,
        location: input.location,
        description: input.description
      });
      return { success: true };
    })
  }),
  // Booking Router
  booking: router({
    // Public: Create a new booking
    create: publicProcedure.input(z2.object({
      customerName: z2.string().min(1),
      customerEmail: z2.string().email(),
      customerPhone: z2.string().min(1),
      pickupAddress: z2.string().min(1),
      deliveryAddress: z2.string().min(1),
      packageWeight: z2.string().min(1),
      serviceType: z2.enum(["same-day", "next-day", "scheduled", "bulk"]),
      scheduledDate: z2.string().optional(),
      specialInstructions: z2.string().optional()
    })).mutation(async ({ input }) => {
      const bookingData = {
        ...input,
        scheduledDate: input.scheduledDate ? new Date(input.scheduledDate) : void 0
      };
      const bookingRef = await createBooking(bookingData);
      await sendBookingNotification({
        bookingRef,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        serviceType: input.serviceType,
        packageWeight: input.packageWeight,
        pickupAddress: input.pickupAddress,
        deliveryAddress: input.deliveryAddress,
        scheduledDate: input.scheduledDate,
        specialInstructions: input.specialInstructions
      });
      return { bookingRef };
    }),
    // Public: Check booking status
    check: publicProcedure.input(z2.object({ bookingRef: z2.string().min(1) })).query(async ({ input }) => {
      const booking = await getBookingByRef(input.bookingRef.toUpperCase());
      return { found: !!booking, booking };
    }),
    // Admin: Get all bookings
    list: protectedProcedure.query(async () => {
      return await getAllBookings();
    }),
    // Admin: Update booking status
    updateStatus: protectedProcedure.input(z2.object({
      bookingRef: z2.string().min(1),
      status: z2.enum(["pending", "confirmed", "picked-up", "completed", "cancelled"])
    })).mutation(async ({ input }) => {
      await updateBookingStatus(input.bookingRef, input.status);
      return { success: true };
    })
  }),
  // Contact Inquiry Router
  contact: router({
    // Public: Submit a contact inquiry
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      subject: z2.string().min(1),
      message: z2.string().min(1)
    })).mutation(async ({ input }) => {
      const id = await createContactInquiry(input);
      await sendContactNotification({
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message
      });
      return { success: true, id };
    }),
    // Admin: Get all inquiries
    list: protectedProcedure.query(async () => {
      return await getAllContactInquiries();
    }),
    // Admin: Update inquiry status
    updateStatus: protectedProcedure.input(z2.object({
      id: z2.number(),
      status: z2.enum(["new", "read", "replied", "closed"])
    })).mutation(async ({ input }) => {
      await updateInquiryStatus(input.id, input.status);
      return { success: true };
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid as nanoid2 } from "nanoid";
import path3 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path2.resolve(import.meta.dirname),
  root: path2.resolve(import.meta.dirname, "client"),
  publicDir: path2.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist", "public") : path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
