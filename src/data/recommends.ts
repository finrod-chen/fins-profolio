import type { RecommendFeed } from "@/types";
import feed from "./recommends.json";

/**
 * The product feed. An n8n workflow calls the Coupang Open API on a
 * schedule and commits the JSON back to this repo, so the page ships
 * as static markup and makes no third-party request at runtime.
 */
export const recommends = feed as RecommendFeed;

export const hasProducts = recommends.slots.some((slot) => slot.products.length > 0);
