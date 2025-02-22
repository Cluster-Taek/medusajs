import { Migration } from '@mikro-orm/migrations';

export class Migration20241127062632 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "brand" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "brand_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "brand" cascade;');
  }

}
