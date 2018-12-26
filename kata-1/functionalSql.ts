/*
In this Kata we are going to mimic the SQL syntax with JavaScript (or TypeScript).

To do this, you must implement the query() function. This function returns and object with the next methods:

{
  select: ...,
  from: ...,
  where: ...,
  orderBy: ...,
  groupBy: ...,
  having: ...,
  execute: ...
}
The methods are chainable and the query is executed by calling the execute() method.
*/

export type WhereFunction = (item: Object) => boolean

export interface QueryParams {
  select?: any
  from?: any[]
  groupBy?: Function[]
  where?: WhereFunction
  orderBy?: Function
}

const identity = x => x

export class Query {
  private params: QueryParams = {
    select: identity,
    groupBy: [],
    from: [],
    where: () => true,
    orderBy: () => 0,
  }

  constructor(params: QueryParams = {}) {
    this.params = {
      ...this.params,
      ...params,
    }
  }
    
  public select = (item?: any) => {
    if (this.params.select !== identity) throw new Error('Duplicate SELECT')
    return new Query({...this.params, select: item})
  }
  
  public from = (arr?: any[]) => {
    if (this.params.from.length !== 0) throw new Error('Duplicate FROM')
    return new Query({...this.params, from: arr})
  } 
  
  public where = (cb?: WhereFunction, ...args: any[]) => {
    return new Query({...this.params, where: cb})
  }
  
  public groupBy = (...groupByFunctions: Function[]) => {
    return new Query({...this.params, groupBy: groupByFunctions})
  }
  
  public orderBy = (...args: any[]) => {
    return new Query({...this.params})
  }
  
  public having = (...args: any[]) => {
    return new Query({...this.params})
  }

  public execute = (...args: any[]) => {
    const asGroups = this.params.groupBy.reduce(
      (a, groupByFunc) => this._groupify(a, groupByFunc), 
      this.params.from,
    )

    const filtered = this._groupFilter(asGroups, this.params.where)

    const select = this._groupMap(filtered, this.params.select)

    return select
  }

  private _groupify = (group: any, groupByFunc: Function): any => {
    return this._applyToGroups(group, (group) => {
      return group.reduce((a, item) => {
        const type = groupByFunc(item)
        const firstOfType = !a.find(a => a[0] === type)

        let out = firstOfType 
          ? [...a, [type, []]]
          : [...a]

        return out.map(group => {
          if (group[0] !== type) {
            return group
          }
          return [type, [...group[1], item]]
        })
      }, [])
    })
  }

  private _applyToGroups = (group: any, cb: Function): any => {
    const isGrouped = typeof group[0] === 'string'

    if (isGrouped) {
      const newItems = this._applyToGroups(group[1], cb)
      return !newItems.length ? [group[0], newItems] : []
    }

    return cb(group)
  }

  private _groupFilter = (group: any, whereFunc: WhereFunction): any => {
    return this._applyToGroups(group, (group: any) => group.filter(whereFunc))
  }

  private _groupMap = (group: any, select: Function): any => {
    return this._applyToGroups(group, (group: any) => group.map(select))
  }
}

export function query() {
  return new Query()
};
