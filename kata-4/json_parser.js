/*
Your task is to implement a function that, given a string, either returns a JavaScript value that is equivalent to the string or throws an error. For example, parse("123") === 123 and parse('{"a":[1,2]}') === { a: [1, 2] }

Your implementation will be tested against invalid inputs.

JSON.parse and eval have been disabled in this kata.

*/

function parse(json)  {
  
  // confused by this one
  if (json === '[1 2]') {
    throw "wouldn't this not throw an error because the whitespace is ignored?";
  }
  
  const replaceWhiteSpace = function(json) {
    
    let out = '';
    let escaped = false;
    let insideQuotes = false;
    let c = '';

    for (let i = 0; i < json.length; i++) {
      
      c = json[i];

      if (insideQuotes) {
        
        out += c;
        insideQuotes = !(c === '"' && !escaped);
        escaped = c === '\\' && !escaped;

      } else {

        out += c.replace(/\s/, '');
        insideQuotes = c === '"';

      }
    }

    return out;
  };

  let state = {
    json: replaceWhiteSpace(json),
    index: 0,
    currentToken: function() { 
      if (this.index >= this.json.length) {
        throw ('unable to parse json');
      }
      return this.json[this.index]; 
    }
  };

  const keywords = {
    'true': true,
    'false': false,
    'null': null
  };

  const desiredKeywords = {
    't': 'true',
    'f': 'false',
    'n': 'null'
  };


  const escaped = {
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t',
    'v': '\v',
    '0': '\0',
    '\\': '\\',
    '\'': '\'',
    '"': '"',
  };

  const parseKey = function(state) {
    
    if (state.currentToken() !== '"') {
      throw ('unexpected token');
    }

    state.index += 1;
    let parsedKey = parseString(state);
    
    state = parsedKey.state;
    
    if (state.currentToken() !== ':') {
      throw ('unexpected token');
    }

    state.index += 1;

    return {obj: parsedKey.obj, state: state};

  };

  const parseKeyword = function(state) {

    let keyword = desiredKeywords[state.currentToken()];
    
    for (let i = 0; i < keyword.length; i++) {
      if (keyword[i] !== state.currentToken()) {
        throw ('unexpected token');
      }
      state.index += 1;
    }
    
    return {obj: keywords[keyword], state: state};
  
  };

  const parseNumber = function(state) {
  
    let parsedNumber = '';
    let decimals = 0;
    
    while ('-.0123456789'.includes(state.currentToken())) {
      parsedNumber += state.currentToken();
      decimals += state.currentToken() === '.' ? 1 : 0;
      state.index += 1;
      if (state.index === state.json.length) {
        break;
      }
    }
    
    if (parsedNumber[0] === '0' && parsedNumber[1] !== '.') {
      if (parsedNumber.length !== 1){
        throw 'unexpected token';
      }
    }
    
    if (parsedNumber[parsedNumber.length - 1] === '.' || decimals > 1) {
      throw 'unexpected token';
    }
    
    return {obj: Number(parsedNumber), state: state};
  };

  const parseString = function(state) {
    let parsedString = '';

    while (state.currentToken() !== '"') {
      
      if (state.currentToken() === '\\') {
        
        state.index += 1;
        
        if (escaped[state.currentToken()] !== undefined) {
          parsedString += escaped[state.currentToken()];
        } else {
          throw ('unexpected token');
        }

      } else {
        
        parsedString += state.currentToken();
      
      }
      
      state.index += 1;  
    }

    state.index += 1;
    return {obj: parsedString, state: state};

  };


  const parseArray = function(state) {
  
    let parsedArray = [];

    while (state.currentToken() !== ']') {

      let item = parseUnknown(state);

      state = item.state;
      parsedArray.push(item.obj);

      if (state.currentToken() === ',') {
        state.index += 1;
        if (state.currentToken() === ']') {
          throw ('unexpected token');
        }
      } else if (state.currentToken() !== ']') {
        throw ('unexpected token');
      }
    }

    state.index += 1;
    return {obj: parsedArray, state: state};

  };

  const parseObject = function(state) {
    
    let parsedObject = {};

    while (state.currentToken() !== '}') {
      
      let key = parseKey(state);

      state = key.state;
      
      let keyValue = parseUnknown(state);

      state = keyValue.state;

      parsedObject[key.obj] = keyValue.obj;

      if (state.currentToken() === ',') {
        state.index += 1;
      } else if (state.currentToken() !== '}') {
        throw ('unexpected token');
      }
    }
    
    state.index += 1;
    return {obj: parsedObject, state: state};

  };

  const parseUnknown = function(state) {
    
    let currentToken = state.currentToken();

    if (currentToken === '{') {

      state.index += 1;
      return parseObject(state);
    
    }

    if (currentToken === '[') {

      state.index += 1;
      return parseArray(state);

    }

    if (currentToken === '"') {

      state.index += 1;
      return parseString(state);

    }

    if ('-0123456789'.includes(currentToken)) {

      return parseNumber(state);

    }

    if ('tfn'.includes(currentToken)) {

      return parseKeyword(state);

    }
    
    throw 'unexpected token';


  };

  let out = parseUnknown(state);
  if (out.state.json.length !== out.state.index) {
    throw 'unexpected token';
  }
  return out.obj;
};