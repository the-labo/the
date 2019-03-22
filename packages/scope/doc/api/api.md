<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

## Modules

<dl>
<dt><a href="#module_default">default</a></dt>
<dd><p>Default exports</p>
</dd>
<dt><a href="#module_@the-/scope">@the-/scope</a></dt>
<dd><p>State scope for the-store</p>
</dd>
<dt><a href="#module_scopes">scopes</a></dt>
<dd><p>Store scopes</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#TheScope">TheScope</a></dt>
<dd></dd>
<dt><a href="#ArrayScope">ArrayScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#BooleanScope">BooleanScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#NullScope">NullScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#NumberScope">NumberScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#ObjectScope">ObjectScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#Scope">Scope</a></dt>
<dd></dd>
<dt><a href="#ScopeScope">ScopeScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#StringScope">StringScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
<dt><a href="#ValueScope">ValueScope</a> ⇐ <code><a href="#Scope">Scope</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#create">create(...args)</a> ⇒ <code><a href="#TheScope">TheScope</a></code></dt>
<dd><p>Create a TheScope instance</p>
</dd>
<dt><a href="#set">set(index, entry)</a></dt>
<dd><p>Set entry at index</p>
</dd>
<dt><a href="#reset">reset(values)</a></dt>
<dd><p>Reset to values</p>
</dd>
</dl>

<a name="module_default"></a>

## default
Default exports

<a name="module_@the-/scope"></a>

## @the-/scope
State scope for the-store

<a name="module_scopes"></a>

## scopes
Store scopes

<a name="TheScope"></a>

## *TheScope*
**Kind**: global abstract class  
<a name="new_TheScope_new"></a>

### *new TheScope(name, config)*
Abstract state class


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of state |
| config | <code>Object</code> | TheScope config |

<a name="ArrayScope"></a>

## ArrayScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [ArrayScope](#ArrayScope) ⇐ [<code>Scope</code>](#Scope)
    * [new ArrayScope()](#new_ArrayScope_new)
    * [.length](#ArrayScope+length)
    * [.concat(values)](#ArrayScope+concat)
    * [.pop()](#ArrayScope+pop)
    * [.push(entry)](#ArrayScope+push)
    * [.reset(values)](#ArrayScope+reset)
    * [.shift()](#ArrayScope+shift)
    * [.unshift(entry)](#ArrayScope+unshift)

<a name="new_ArrayScope_new"></a>

### new ArrayScope()
Scope to hold array

<a name="ArrayScope+length"></a>

### arrayScope.length
**Kind**: instance property of [<code>ArrayScope</code>](#ArrayScope)  
**Properties**

| Type |
| --- |
| <code>number</code> | 

<a name="ArrayScope+concat"></a>

### arrayScope.concat(values)
Concat values

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  

| Param | Type |
| --- | --- |
| values | <code>\*</code> | 

<a name="ArrayScope+pop"></a>

### arrayScope.pop()
Pop entry

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  
<a name="ArrayScope+push"></a>

### arrayScope.push(entry)
Push entry

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  

| Param | Type |
| --- | --- |
| entry | <code>\*</code> | 

<a name="ArrayScope+reset"></a>

### arrayScope.reset(values)
Reset state with values

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 

<a name="ArrayScope+shift"></a>

### arrayScope.shift()
Shift entry

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  
<a name="ArrayScope+unshift"></a>

### arrayScope.unshift(entry)
Unshift entry

**Kind**: instance method of [<code>ArrayScope</code>](#ArrayScope)  

| Param | Type |
| --- | --- |
| entry | <code>\*</code> | 

<a name="BooleanScope"></a>

## BooleanScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [BooleanScope](#BooleanScope) ⇐ [<code>Scope</code>](#Scope)
    * [new BooleanScope()](#new_BooleanScope_new)
    * [.toggle([value])](#BooleanScope+toggle)
    * [.false()](#BooleanScope+false)
    * [.set()](#BooleanScope+set)
    * [.true()](#BooleanScope+true)

<a name="new_BooleanScope_new"></a>

### new BooleanScope()
Scope to hold boolean

<a name="BooleanScope+toggle"></a>

### booleanScope.toggle([value])
Toggle value

**Kind**: instance method of [<code>BooleanScope</code>](#BooleanScope)  

| Param | Type |
| --- | --- |
| [value] | <code>Boolean</code> | 

<a name="BooleanScope+false"></a>

### booleanScope.false()
Toggle to false

**Kind**: instance method of [<code>BooleanScope</code>](#BooleanScope)  
<a name="BooleanScope+set"></a>

### booleanScope.set()
Alias of toggle

**Kind**: instance method of [<code>BooleanScope</code>](#BooleanScope)  
<a name="BooleanScope+true"></a>

### booleanScope.true()
Toggle to true

**Kind**: instance method of [<code>BooleanScope</code>](#BooleanScope)  
<a name="NullScope"></a>

## NullScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  
<a name="new_NullScope_new"></a>

### new NullScope()
Scope to hold null

<a name="NumberScope"></a>

## NumberScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [NumberScope](#NumberScope) ⇐ [<code>Scope</code>](#Scope)
    * [new NumberScope()](#new_NumberScope_new)
    * [.decrement([amount])](#NumberScope+decrement)
    * [.increment([amount])](#NumberScope+increment)
    * [.set(n)](#NumberScope+set)
    * [.isNegative()](#NumberScope+isNegative) ⇒ <code>boolean</code>
    * [.isPositive()](#NumberScope+isPositive) ⇒ <code>boolean</code>
    * [.isZero()](#NumberScope+isZero) ⇒ <code>boolean</code>

<a name="new_NumberScope_new"></a>

### new NumberScope()
Scope to hold number

<a name="NumberScope+decrement"></a>

### numberScope.decrement([amount])
Decrement value

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  

| Param | Type | Default |
| --- | --- | --- |
| [amount] | <code>number</code> | <code>1</code> | 

<a name="NumberScope+increment"></a>

### numberScope.increment([amount])
Increment value

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  

| Param | Type | Default |
| --- | --- | --- |
| [amount] | <code>number</code> | <code>1</code> | 

<a name="NumberScope+set"></a>

### numberScope.set(n)
Set number

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  

| Param | Type |
| --- | --- |
| n | <code>number</code> | 

<a name="NumberScope+isNegative"></a>

### numberScope.isNegative() ⇒ <code>boolean</code>
Check the value is negative

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  
<a name="NumberScope+isPositive"></a>

### numberScope.isPositive() ⇒ <code>boolean</code>
Check the value is positive

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  
<a name="NumberScope+isZero"></a>

### numberScope.isZero() ⇒ <code>boolean</code>
Check the value is zero

**Kind**: instance method of [<code>NumberScope</code>](#NumberScope)  
<a name="ObjectScope"></a>

## ObjectScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [ObjectScope](#ObjectScope) ⇐ [<code>Scope</code>](#Scope)
    * [new ObjectScope()](#new_ObjectScope_new)
    * [.del(...names)](#ObjectScope+del)
    * [.drop()](#ObjectScope+drop)
    * [.set(name, value)](#ObjectScope+set)
    * [.get()](#ObjectScope+get)
    * [.has()](#ObjectScope+has)

<a name="new_ObjectScope_new"></a>

### new ObjectScope()
Scope to hold object

<a name="ObjectScope+del"></a>

### objectScope.del(...names)
Delete property

**Kind**: instance method of [<code>ObjectScope</code>](#ObjectScope)  

| Param | Type | Description |
| --- | --- | --- |
| ...names | <code>string</code> | Name to delete |

<a name="ObjectScope+drop"></a>

### objectScope.drop()
Delete all

**Kind**: instance method of [<code>ObjectScope</code>](#ObjectScope)  
<a name="ObjectScope+set"></a>

### objectScope.set(name, value)
Set property

**Kind**: instance method of [<code>ObjectScope</code>](#ObjectScope)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name to set |
| value | <code>\*</code> | Value to set |

<a name="ObjectScope+get"></a>

### objectScope.get()
Get a value for name

**Kind**: instance method of [<code>ObjectScope</code>](#ObjectScope)  
<a name="ObjectScope+has"></a>

### objectScope.has()
Check value exists for name

**Kind**: instance method of [<code>ObjectScope</code>](#ObjectScope)  
<a name="Scope"></a>

## *Scope*
**Kind**: global abstract class  

* *[Scope](#Scope)*
    * *[new Scope(name, config)](#new_Scope_new)*
    * *~~[.withDefault()](#Scope.withDefault)~~*

<a name="new_Scope_new"></a>

### *new Scope(name, config)*
Abstract scope class


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of state |
| config | <code>Object</code> | Scope config |

<a name="Scope.withDefault"></a>

### *~~Scope.withDefault()~~*
***Deprecated***

**Kind**: static method of [<code>Scope</code>](#Scope)  
<a name="ScopeScope"></a>

## ScopeScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [ScopeScope](#ScopeScope) ⇐ [<code>Scope</code>](#Scope)
    * [new ScopeScope()](#new_ScopeScope_new)
    * [.get(namepath)](#ScopeScope+get) ⇒ <code>\*</code>
    * [.has(namepath)](#ScopeScope+has) ⇒ <code>boolean</code>
    * [.init(...names)](#ScopeScope+init)
    * [.of(namepath)](#ScopeScope+of) ⇒ [<code>ScopeScope</code>](#ScopeScope)
    * [.set(namepath, value)](#ScopeScope+set)

<a name="new_ScopeScope_new"></a>

### new ScopeScope()
Scope to other scopes

<a name="ScopeScope+get"></a>

### scopeScope.get(namepath) ⇒ <code>\*</code>
Get state value from name path string

**Kind**: instance method of [<code>ScopeScope</code>](#ScopeScope)  
**Returns**: <code>\*</code> - Stored state  

| Param | Type |
| --- | --- |
| namepath | <code>string</code> | 

<a name="ScopeScope+has"></a>

### scopeScope.has(namepath) ⇒ <code>boolean</code>
Check if scope exists

**Kind**: instance method of [<code>ScopeScope</code>](#ScopeScope)  

| Param | Type |
| --- | --- |
| namepath | <code>string</code> | 

<a name="ScopeScope+init"></a>

### scopeScope.init(...names)
Init scope values

**Kind**: instance method of [<code>ScopeScope</code>](#ScopeScope)  

| Param |
| --- |
| ...names | 

<a name="ScopeScope+of"></a>

### scopeScope.of(namepath) ⇒ [<code>ScopeScope</code>](#ScopeScope)
Sub scope of namepath

**Kind**: instance method of [<code>ScopeScope</code>](#ScopeScope)  

| Param |
| --- |
| namepath | 

<a name="ScopeScope+set"></a>

### scopeScope.set(namepath, value)
Set state with name path

**Kind**: instance method of [<code>ScopeScope</code>](#ScopeScope)  

| Param | Type |
| --- | --- |
| namepath | <code>string</code> | 
| value | <code>\*</code> | 

<a name="StringScope"></a>

## StringScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [StringScope](#StringScope) ⇐ [<code>Scope</code>](#Scope)
    * [new StringScope()](#new_StringScope_new)
    * [.del()](#StringScope+del)
    * [.replace(from, to)](#StringScope+replace)
    * [.set(value)](#StringScope+set)

<a name="new_StringScope_new"></a>

### new StringScope()
Scope to hold value

<a name="StringScope+del"></a>

### stringScope.del()
Delete property

**Kind**: instance method of [<code>StringScope</code>](#StringScope)  
<a name="StringScope+replace"></a>

### stringScope.replace(from, to)
Replace string

**Kind**: instance method of [<code>StringScope</code>](#StringScope)  

| Param | Type |
| --- | --- |
| from | <code>string</code> \| <code>RegExp</code> | 
| to | <code>string</code> | 

<a name="StringScope+set"></a>

### stringScope.set(value)
Set property

**Kind**: instance method of [<code>StringScope</code>](#StringScope)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value to set |

<a name="ValueScope"></a>

## ValueScope ⇐ [<code>Scope</code>](#Scope)
**Kind**: global class  
**Extends**: [<code>Scope</code>](#Scope)  

* [ValueScope](#ValueScope) ⇐ [<code>Scope</code>](#Scope)
    * [new ValueScope()](#new_ValueScope_new)
    * [.del()](#ValueScope+del)
    * [.set(value)](#ValueScope+set)

<a name="new_ValueScope_new"></a>

### new ValueScope()
Scope to hold value

<a name="ValueScope+del"></a>

### valueScope.del()
Delete property

**Kind**: instance method of [<code>ValueScope</code>](#ValueScope)  
<a name="ValueScope+set"></a>

### valueScope.set(value)
Set property

**Kind**: instance method of [<code>ValueScope</code>](#ValueScope)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value to set |

<a name="create"></a>

## create(...args) ⇒ [<code>TheScope</code>](#TheScope)
Create a TheScope instance

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="set"></a>

## set(index, entry)
Set entry at index

**Kind**: global function  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 
| entry | <code>\*</code> | 

<a name="reset"></a>

## reset(values)
Reset to values

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Object</code> | 
