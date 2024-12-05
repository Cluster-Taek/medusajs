import { Migration } from '@mikro-orm/migrations';

export class Migration20241203041802 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "brand" add column if not exists "description" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "brand" drop column if exists "description";');
  }

}
