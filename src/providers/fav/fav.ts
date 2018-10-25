import { Injectable } from '@angular/core';
import { SqlDatabase } from 'ionix-sqlite';

@Injectable()
export class FavProvider {

  private dbPromise: Promise<SqlDatabase>;

  constructor() {
    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS favs (
        localId INTEGER PRIMARY KEY,
        id INTEGER,
        date VARCHAR(250),
        title VARCHAR(250),
        slug VARCHAR(250),
        content TEXT,
        desc TEXT,
        link VARCHAR(250)
      )
    `;
    this.dbPromise = SqlDatabase.open('lmdb' + '5' + '.db', [createItemsTable]);
  }

  getItems(): Promise<any[]> {

    const select = 'SELECT id, date, title, slug, content, desc, link FROM favs';
    const params = [];
    return this.dbPromise
      .then(db => db.execute(select, params))
      .then(resultSet => {
        const items = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
          const row = resultSet.rows.item(i);
          items.push({
            id: row.id,
            date: row.date,
            title: row.title,
            slug: row.slug,
            content: (row.content !== 'undefined') ? row.content : false,
            desc: (row.desc !== 'undefined') ? row.desc : false,
            link: row.link,
          });
        }
        return items;
      });
  }

  addItem(link) {
    const select = 'INSERT INTO favs VALUES(NULL,?,?,?,?,?,?,?)';
    return this.dbPromise
      .then(db => db.execute(select, [link.id, link.date, link.title, link.slug, link.content, link.desc, link.link]))
      .catch(err => console.log(err))
  }

  removeItem(link) {
    const deleteSql = 'DELETE FROM favs WHERE id=?';
    return this.dbPromise
      .then(db => db.execute(deleteSql, [link.id]))
      .catch(err => console.log(err))
  }

}
