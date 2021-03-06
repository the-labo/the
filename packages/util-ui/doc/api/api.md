<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

## Modules

<dl>
<dt><a href="#module_@the-/util-ui">@the-/util-ui</a></dt>
<dd><p>Utility for the-components</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#base64ToBlob">base64ToBlob(base64String)</a> ⇒ <code>Blob</code></dt>
<dd><p>Convert base64 data into blob
module:@the-/util-ui</p>
</dd>
<dt><del><a href="#isVideoSrc">isVideoSrc(src)</a> ⇒ <code>*</code></del></dt>
<dd></dd>
</dl>

<a name="module_@the-/util-ui"></a>

## @the-/util-ui
Utility for the-components

**Version**: 16.4.3  
**License**: MIT  

* [@the-/util-ui](#module_@the-/util-ui)
    * [.asStyleData(scopeSelector, data)](#module_@the-/util-ui.asStyleData) ⇒ <code>Object</code>
    * [.bindEventListeners(elm, handlers, [opt])](#module_@the-/util-ui.bindEventListeners) ⇒ <code>function</code>
    * [.changedProps(prevProps, props)](#module_@the-/util-ui.changedProps) ⇒ <code>Object</code>
    * [.eventHandlersFor(props, [options])](#module_@the-/util-ui.eventHandlersFor) ⇒ <code>Object</code>
    * [.htmlAttributesFor(props, [options])](#module_@the-/util-ui.htmlAttributesFor) ⇒ <code>Object</code>
    * [.isKeyCode(code, name)](#module_@the-/util-ui.isKeyCode) ⇒ <code>boolean</code>
    * [.isMultiTouchEvent(e)](#module_@the-/util-ui.isMultiTouchEvent) ⇒ <code>boolean</code>
    * [.isServerSide()](#module_@the-/util-ui.isServerSide) ⇒ <code>boolean</code>
    * [.newId([options])](#module_@the-/util-ui.newId) ⇒ <code>string</code>
    * [.observeSize(elm, handler)](#module_@the-/util-ui.observeSize) ⇒ <code>function</code>
    * ~~[.readFileAsDataURL(file)](#module_@the-/util-ui.readFileAsDataURL) ⇒ <code>Promise.&lt;string&gt;</code>~~
    * [.stopTouchScrolling([options])](#module_@the-/util-ui.stopTouchScrolling) ⇒ <code>function</code>
    * [.toggleBodyClass([enabled&#x3D;], className)](#module_@the-/util-ui.toggleBodyClass) ⇒ <code>\*</code>

<a name="module_@the-/util-ui.asStyleData"></a>

### utilUi.asStyleData(scopeSelector, data) ⇒ <code>Object</code>
Mark  : style data

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>Object</code> - Style data  

| Param | Type | Description |
| --- | --- | --- |
| scopeSelector | <code>string</code> | Selector which wraps data |
| data | <code>Object</code> | Style data |

<a name="module_@the-/util-ui.bindEventListeners"></a>

### utilUi.bindEventListeners(elm, handlers, [opt]) ⇒ <code>function</code>
**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>function</code> - - Unbind function  

| Param | Type | Description |
| --- | --- | --- |
| elm |  |  |
| handlers | <code>Object</code> |  |
| [opt] | <code>Object</code> | Options settings |

<a name="module_@the-/util-ui.changedProps"></a>

### utilUi.changedProps(prevProps, props) ⇒ <code>Object</code>
Extract changed props

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>Object</code> - - Changed prop values  

| Param | Type |
| --- | --- |
| prevProps | <code>Object</code> | 
| props | <code>Object</code> | 

<a name="module_@the-/util-ui.eventHandlersFor"></a>

### utilUi.eventHandlersFor(props, [options]) ⇒ <code>Object</code>
Extract event handlers for component props

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>Object</code> - Props for html attributes  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component prop |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.except] | <code>Array.&lt;string&gt;</code> |  | Exception names |

<a name="module_@the-/util-ui.htmlAttributesFor"></a>

### utilUi.htmlAttributesFor(props, [options]) ⇒ <code>Object</code>
Extract html attributes for component props

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>Object</code> - Props for html attributes  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component prop |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.except] | <code>Array.&lt;string&gt;</code> |  | Exception names |

<a name="module_@the-/util-ui.isKeyCode"></a>

### utilUi.isKeyCode(code, name) ⇒ <code>boolean</code>
Key code detector

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>number</code> | Key code to check |
| name | <code>string</code> \| <code>number</code> | Name of key code to compare |

<a name="module_@the-/util-ui.isMultiTouchEvent"></a>

### utilUi.isMultiTouchEvent(e) ⇒ <code>boolean</code>
Is multi touch event

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  

| Param | Type |
| --- | --- |
| e | <code>Event</code> | 

<a name="module_@the-/util-ui.isServerSide"></a>

### utilUi.isServerSide() ⇒ <code>boolean</code>
Detect is serverside

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
<a name="module_@the-/util-ui.newId"></a>

### utilUi.newId([options]) ⇒ <code>string</code>
Generate new id

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional settings |
| [options.prefix-'the'] | <code>string</code> |  | Id prefix |

<a name="module_@the-/util-ui.observeSize"></a>

### utilUi.observeSize(elm, handler) ⇒ <code>function</code>
**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>function</code> - - Unobserve function  

| Param | Type |
| --- | --- |
| elm | <code>HTMLElement</code> | 
| handler | <code>function</code> | 

<a name="module_@the-/util-ui.readFileAsDataURL"></a>

### ~~utilUi.readFileAsDataURL(file) ⇒ <code>Promise.&lt;string&gt;</code>~~
***Deprecated***

Read file  : data url

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Data url  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | File to read |

<a name="module_@the-/util-ui.stopTouchScrolling"></a>

### utilUi.stopTouchScrolling([options]) ⇒ <code>function</code>
Stop touch scrolling

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  
**Returns**: <code>function</code> - Resume function  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | 

<a name="module_@the-/util-ui.toggleBodyClass"></a>

### utilUi.toggleBodyClass([enabled&#x3D;], className) ⇒ <code>\*</code>
Toggle class on document body

**Kind**: static method of [<code>@the-/util-ui</code>](#module_@the-/util-ui)  

| Param | Type | Description |
| --- | --- | --- |
| [enabled=] | <code>boolean</code> | Enabled or not |
| className | <code>string</code> | Class name to toggle |

<a name="base64ToBlob"></a>

## base64ToBlob(base64String) ⇒ <code>Blob</code>
Convert base64 data into blob
module:@the-/util-ui

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| base64String | <code>string</code> | base64 encoded string |

<a name="isVideoSrc"></a>

## ~~isVideoSrc(src) ⇒ <code>\*</code>~~
***Deprecated***

**Kind**: global function  

| Param |
| --- |
| src | 

