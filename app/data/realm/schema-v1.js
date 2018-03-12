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

const Growth = {
  name: "Growth",
  primaryKey: 'id',    
  properties: {
    id:  { type: "string", indexed: true },
    sectionId: {type: 'int', default: 0},
    name:   {type: 'string', default: ''},
    remark: {type: 'string', default: ''},
    year:   {type: 'int', default: 0},
    month:  {type: 'int', default: 0},
    week:   {type: 'int', default: 0},
    day:    {type: 'int', default: 0},
    detail:   {type: 'string', default: ""},
  }
};

module.exports = {
  schema: [
    Diary,Growth
  ],
  schemaVersion: 3,
  migration: () => {}
};
