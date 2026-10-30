   import { neon } from "@neondatabase/serverless";

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   type Row = Record<string, any>;
   type Sql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Row[]>;

   let client: ReturnType<typeof neon> | undefined;

   export const sql: Sql = (strings, ...values) => {
     if (!client) {
       const url = process.env.DATABASE_URL;
       if (!url) throw new Error("DATABASE_URL is not set");
       client = neon(url);
     }
     return client(strings, ...values) as Promise<Row[]>;
   };