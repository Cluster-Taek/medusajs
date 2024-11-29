import { Migration } from '@mikro-orm/migrations';

export class Migration20241128071342 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "brand" rename column "title" to "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "brand" rename column "name" to "title";');
  }

}
