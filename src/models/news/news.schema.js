import z from "zod";
export const NewsSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(10).max(1000),
  thumbnail: z.string().url(),
  slug: z.string().min(2).max(100),
  authorId: z.string().uuid(),
  publishedAt: z.string().optional(),
});
export const updateNewsSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  content: z.string().min(10).max(1000).optional(),
  thumbnail: z.string().url().optional(),
  slug: z.string().min(2).max(100).optional(),
  authorId: z.string().uuid().optional(),
  publishedAt: z.string().optional(),
});
