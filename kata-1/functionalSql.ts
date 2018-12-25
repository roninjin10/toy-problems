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

type WhereFunction = (item: Object) => boolean

interface QueryParams {
  select?: any
  from?: any[]
  groupBy?: Function
  where?: WhereFunction
}

const identity = x => x

export function query(params: QueryParams = {}, ...args: any[]) {
  const _select = params.select || identity
  function select(item?: any, ...args: any[]) {
    if (_select !== identity) throw new Error('Duplicate SELECT')
    return query({...params, select: item})
  }
  
  const _from: any[] = params.from || []
  function from(arr?: any[], ...args: any[]) {
    if (_from.length !== 0) throw new Error('Duplicate FROM')
    return query({...params, from: arr})
  } 
  
  const _where: WhereFunction = params.where || ((...args: any[]) => true)
  function where(cb?: WhereFunction, ...args: any[]) {
    return query({...params, where: cb})
  }
  
  function orderBy(...args: any[]){
    return query({...params})
  }
  
  const _groupBy: any = params.groupBy || null
  function groupBy(groupByFunction: Function, ...args: any[]){
    return query({...params, groupBy: groupByFunction})
  }
  
  function having(...args: any[]){
    return query({...params})
  }
  
  function execute(...args: any[]){
    const filtered = _from.filter(_where)
     
    let grouped = filtered
    
    if (_groupBy) {
      const groups = _from.reduce((a,e) => {
        if (!_where(e)) return a
      
        const group = _groupBy(e)
        
        if (!a[group]) a[group] = []
        
        return {
          ...a, 
          [group]: [...a[group], e]
        }
      }, {})
      
      grouped = Object.keys(groups).map(group => [group, groups[group]])
    }
    
    const selected = grouped.map(_select)
    console.log('test')
    return selected
  }
  
  return { select, from, where, orderBy, groupBy, having, execute } 
};
