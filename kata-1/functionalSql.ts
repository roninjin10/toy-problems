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
  groupBy?: Function
  where?: WhereFunction
  orderBy?: Function
}

const identity = x => x

export class Query {
  static DEFAULT_PARAMS = {
    select: identity,
  }

  private _select = Query.DEFAULT_PARAMS.select
  private _from = Query.DEFAULT_PARAMS.from
  private _where = Query.DEFAULT_PARAMS.select
  private _orderBy = Query.DEFAULT_PARAMS.select
  private _groupBy = Query.DEFAULT_PARAMS.select

  private _params() {
    return {select: this._select, from: this._from, where: this._where, orderBy: this._orderBy, groupBy: this._groupBy}
  }

  constructor(params: QueryParams = {}) {
    function assignParam(param: string) {
      this[param] = params[param] || Query.DEFAULT_PARAMS[param]
    }
    Object.keys(Query).forEach(assignParam)
  }
    
  select(item?: any) {
    if (this._select !== identity) throw new Error('Duplicate SELECT')
    return new Query({...this._params(), select: item})
  }
  
  from(arr?: any[]) {
    if (this._from.length !== 0) throw new Error('Duplicate FROM')
    return new Query({...this._params(), from: arr})
  } 
  where(cb?: WhereFunction, ...args: any[]) {
    return new Query({...this._params(), where: cb})
  }
  
  groupBy(groupByFunction: Function, ...args: any[]){
    return new Query({...this._params(), groupBy: groupByFunction})
  }
  
  orderBy(...args: any[]){
    return new Query({...this._params()})
  }
  
  having(...args: any[]){
    return new Query({...this._params()})
  }
    
  execute(...args: any[]){
    const filtered = this._from.filter(this._where)
    
    let grouped = filtered
    
    if (this._groupBy) {
      const groups = this._from.reduce((a,e) => {
        if (!this._where(e)) return a
      
        const group = this._groupBy(e)
        
        if (!a[group]) a[group] = []
        
        return {
          ...a, 
          [group]: [...a[group], e]
        }
      }, {})
      
      grouped = Object.keys(groups).map(group => [group, groups[group]])
    }
    
    const selected = grouped.map(this._select)
    return selected
  }
}

export function query() {
  return new Query()
};
