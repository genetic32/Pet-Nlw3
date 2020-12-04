import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPet1606941798498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'pets',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        

      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}