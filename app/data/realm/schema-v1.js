/**
 * 数据库框架 v1
 */

const Diary ={
  name: 'Diary',
  primaryKey: 'id',    
  properties: {
    id:      { type: "string", indexed: true },
    name:    {type: 'string', default: ''},
    year:    {type: 'string', default: ''},
    month:   {type: 'string', default: ''},
    day:     {type: 'string', default: ''},
    photos:  'string[]',
    content: {type: 'string', default: ''},
    weather: {type: 'string', default: ''},
  }
}

module.exports = {
  schema: [
    Diary,
  ],
  schemaVersion: 1,
  migration: () => {}
};
