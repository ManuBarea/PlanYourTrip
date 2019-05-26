import UserList from './user-list.model';

const extractUserLists = (listsObject, ...types) => {
  let result = [];
  if (listsObject != null) {
    listsObject.groups
      .filter(group => !types.length || types.indexOf(group.type) !== -1)
      .flatMap(group => group.items)
      .forEach(item => {
        if (!result.some(it => it.id === item.id)) {
          result.push(item);
        }
      })
  }
  console.log('found user lists', result);
  return result.map(data => new UserList(data));
}

export default class User {

  constructor(data = {}) {
    this._id = data.id || null;
    this._firstName = data.firstName || null;
    this._lists = extractUserLists(data.lists);
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get firstName() {
    return this._firstName;
  }

  set lists(lists) {
    this._lists = lists;
  }

  get lists() {
    return this._lists;
  }
}
