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
        title VARCHAR(250),
        desc VARCHAR(250),
        url VARCHAR(250),
        category VARCHAR(250),
        categoryId INTEGER
      )
    `;
    this.dbPromise = SqlDatabase.open('lmdb' + '2' + '.db', [createItemsTable]);
  }

  getItems(category): Promise<any[]> {
    let select = 'SELECT id, title, desc, url, category, categoryId FROM favs WHERE categoryId = ?';
    let params = [category.id];
    if(category === false){
      select = 'SELECT id, title, desc, url, category, categoryId FROM favs';
      params = [];
    }
    return this.dbPromise
      .then(db => db.execute(select, params))
      .then(resultSet => {
        const items = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
          const row = resultSet.rows.item(i);
          items.push({
            id: row.id,
            title: row.title,
            desc: row.desc,
            url: row.url,
            category: row.category,
            categoryId: row.categoryId,
          });
        }
        return items;
      });
  }

  addItem(link, category) {
    const select = 'INSERT INTO favs VALUES(NULL,?,?,?,?,?,?)';
    return this.dbPromise
      .then(db => db.execute(select, [link.id, link.title, link.desc, link.url, category.name, category.id]))
      .catch(err => console.log(err))
  }

  removeItem(link, category) {
    const deleteSql = 'DELETE FROM favs WHERE id=?';
    return this.dbPromise
      .then(db => db.execute(deleteSql, [link.id]))
      .catch(err => console.log(err))
  }

}
