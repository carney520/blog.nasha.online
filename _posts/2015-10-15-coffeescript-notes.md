---
layout: post
title: "coffeescript notes"
description: "CoffeeScript 让javascript更美好。"
category: javascript
tags: [javascript,coffeescript]
---
{% include JB/setup %}

##CoffeeScript Notes


<h2>Table of Content</h2>
* TOC
{:toc}

<i>注：本文需要一定的JS基础</i>

我接触coffeescript的原因是coffeescript是Ruby on Rails的默认javascript引擎。不为别的，就冲着他的语法像Ruby我就想学他。我不确定coffeescript在严格意义上是否能称为一种语言，coffeescript的功能非常简单，只要花半天或许更少时间就可以基本掌握 它。前提是你要熟悉javascript，如果再熟悉**Ruby**就更得心应手了。因为coffeescript的很多语法都是借鉴Ruby还有Python。
使用coffeescript可以编写更少更优美的代码,同时可以弥补javascript一些不足（主要是语法上，不是功能上，因为coffeescript
just javascript。比如类的实现，coffeescript只是使用的了更多的代码，hack出这个功能。或者在语法上避免了一些容易出现BUG的代码，比如作用域。）

记住：“it just javascript”.但凡javascript无法实现的，coffeescript也是无能为力的。


##Note 1 空格和分号
取经之python，coffeescript使用空格缩进取代了花括号,即在CS中空格是有意义的，比如下面定义一个函数。
同样，分号在CS中是*非必需的*
{% highlight coffeescript linenos %}
square = (x) -> 
  x * x

square 4
{% endhighlight %}

编译后的

{% highlight javascript linenos %}
(function(){
  var square;
	square = function(x){
		return x * x;
	};

	square(4);
}).call(this);
{% endhighlight %}

##Note 2 函数和括号
CS使用`->`来取代`function`关键字。这个语法类似于Ruby中的lambda表达式
同样函数调用使的括号是*可有可无*的。
虽然省略括号可以让代码更加整洁，但是也可能让人有点混乱。我觉得尽量加上括号为好，特别是在参数比较复杂的时候。有时候看别人的代码会弄不清哪个是变量哪个是函数。即使在Ruby下也是如此。

##Note 3 作用域
javascript的作用域经常是bug的来源，因为它存在两种定义的方式:
+ 不使用`var`关键字使，就是创建一个全局作用域
+ 使用`var`关键字定义变量时，它只存在于当前的上下文。在javascript中不存在*块作用域*,局部变量即是在*函数内部*使用`var`定义的变量。

{% highlight coffeescript linenos %}
a = 'A'
myFunc = ->
  a = 'AA'
	b = 'b'
{% endhighlight %}

编译后
{% highlight javascript linenos %}
(function(){
  var a,myFunc;
	a = 'A';
	myFunc = function(){
	  var b';
		a = 'AA';
		return b = 'b';
	};
}).call(this);
{% endhighlight %}

由上可知，所有的变量包括函数引用变量都会使用var进行定义。这是javascript的最佳实践。
另外可以看到，CS没有对a变量再次进行定义，因为CS在进行编译时，已经看到之前定义的变量a，它会假定你会在myFunc函数中继续使用该变量。

##Note 4 匿名封装器函数
前面看到，CS编译后的代码段都会被包含在`(function(){ //.. }).call(this);`这样的匿名封装函数中。这是因为，这样就可以在其内部随意的定义和操作而不会污染全局作用域。
这是javascript中一个重要的变成技巧。
如果想要将变量或者函数暴露给外部的作用域，可以将其绑定到`this`变量中。这就是`call`函数的作用了，call和apply函数可以让函数绑定到特定的上下文中执行，比如这里传入的`this`变量就是指向*全局执行环境*的。

> 每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。比如在浏览器中，全局执行环境被认为是`window`对象。即所有全局变量和函数都是window对象的属性和方法。

例如在浏览器环境下：
{% highlight coffeescript linenos %}

window.sayHi = ->
  console.log "hello world"

{% endhighlight %}

与下面是等价的，因为浏览器环境下匿名封装函数绑定的`this`就是指向window对象
{% highlight coffeescript linenos %}

@sayHi = ->             #=> this.sayHi
  console.log "hello world"

{% endhighlight %}

编译后

{% highlight javascript linenos %}
(function(){
	this.sayHi = function(){
    return console.log("hello world");
	};
}).call(this);
{% endhighlight %}

这时候就可以在外部访问了。



##Note 5 插值语法
在Ruby中，在字符串中插入变量可以这样子：`"hello my name is #{name},I'm from #{country}"`
CS也可以这样，而且它还可以是任意的有效的CS代码：

{% highlight coffeescript linenos %}
text = "Add numbers : #{1 + 1}"
day = "sunday"
console.log "It's a beautiful #{if day is 'sunday' then day else "Day"}"
{% endhighlight %}

{% highlight javascript linenos %}
(function(){
  var day,text;
	text = "Add number: " + (1 + 1);
	console.log("It's a beautiful " + (day === 'sunday' ? day : "Day"));
}).call(this);
{% endhighlight %}


##Note 6 heredoc and comment
在Ruby还有其他脚本语言中都有heredoc来输入跨行文字，CS也添加了这个功能

{% highlight coffeescript linenos %}
html = """
		 <strong>
			cup of coffeescript
		</strong>
		 """
{% endhighlight %}

{% highlight javascript linenos %}
  var html;
	html = "<strong>\n  cup of coffeescript\n</strong>";
{% endhighlight %}

多行注释使用`###`
{% highlight coffeescript linenos %}
###
SkinnyMochaHalfCaffScript Compiler v1.0
Released under the MIT License
###
{% endhighlight %}


##Note 6 操作符和控制结构
CS扩展操作符：
<table class="table table-bordered table-hover">
	<thead class="thead-inverse">
		<tr>
			<th>CS</th>
			<th>JS/description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>?=</td>
			<td>如果不存在，不存在则赋值</td>
		</tr>
		<tr>
			<td>||=</td>
			<td>判断条件为假则赋值</td>
		</tr>
		<tr>
			<td>&&=</td>
			<td>判断为真则赋值</td>
		</tr>
		<tr>
			<td>a ** b</td>
			<td>Math.pow(a,b)</td>
		</tr>
		<tr>
			<td>a // b</td>
			<td>Math.floor(a/b)</td>
		</tr>
		<tr>
			<td>is</td>
			<td>===</td>
		</tr>
		<tr>
			<td>isnt</td>
			<td>!==</td>
		</tr>
		<tr>
			<td>not</td>
			<td>!</td>
		</tr>
		<tr>
			<td>and</td>
			<td>&&</td>
		</tr>
		<tr>
			<td>or</td>
			<td>||</td>
		</tr>
		<tr>
			<td>true,yes,on</td>
			<td>true</td>
		</tr>
		<tr>
			<td>false,no,off</td>
			<td>false</td>
		</tr>
		<tr>
			<td>@,this</td>
			<td>this</td>
		</tr>
		<tr>
			<td>of</td>
			<td>in</td>
		</tr>
		<tr>
			<td>in</td>
			<td>no JS equivalent</td>
		</tr>
		<tr>
			<td>a > b > c </td>
			<td>链式比较：a > b && b > c</td>
		</tr>
	</tbody>
</table>

###条件控制符
CS 使用if／else／else if这样的语法来控制条件语句
另外还引入了unless语句：
{% highlight coffeescript linenos %}
unless you.love(me)
  letMeAlone()
{% endhighlight %}

> 在CS中不支持三元表达式（？：）但支持內联条件语句和循环语句：
> `letMeAlone() unless you.love(me)`
> 或者 `date = if friday then sue else jill`
> 当语句为单行时，要加上then

存在操作符。
CS借鉴了Ruby引入了存在操作符`?`
{% highlight coffeescript linenos %}
if html?
  console.log html
{% endhighlight %}

{% highlight javascript linenos %}
(function(){
  if (typeof html !== "undefined" && html !== null) console.log(html);
}).call(this);
{% endhighlight %}

###switch语句
CS的switch语句同Ruby
{% highlight coffeescript linenos %}
today="Monday"
switch today
  when "saturday"
	   console.log "saturday"
	when "sunday"
	   console.log "sunday"  #add break automated
	else      #=>default
	   "monday"
{% endhighlight %}


##Note 7 函数
前面已经介绍到了函数，函数定义主要是使用`->`操作符，参数列表放置在`->`之前。如：
{% highlight coffeescript linenos %}
foo=()->
  console.log "hello world"

foo()
{% endhighlight %}

编译后

{% highlight javascript linenos %}
(function(){
  var foo;
	foo = function(){
	  return console.log("hello world");
	};
	foo();
}).call(this);
{% endhighlight %}

> 前面说到，调用函数时，括号是可有可无的，但是CS要求在调用*无参函数*时必须显示加入括号，以表调用，不然他就是一个普通的变量.在这里笔者再次强调一下，在函数调用时最好是显式地使用括号，我觉得这样可读性更好(特别是把参数放置在多行)，而且可以减少一些bug。

CS的函数会默认返回最后一个语句的。不管它是什么，比如上面的`return console.log("hello world")`.这个特性也是借鉴Ruby的。如果要显式返回一个值，请用`return`关键字

###默认参数
在CS中给函数赋予默认参数非常简单：
{% highlight coffeescript linenos %}
link = (url,text=url) ->
  "<a href='#{url}'>#{text}</a>"

console.log link("http://www.google.com")
console.log link("http://www.google.com","Google")
{% endhighlight %}

编译后
{% highlight javascript linenos %}
(function(){
  var link;
	link = function(url,text){
	  if(text == null)
		  text = url;
		return "<a href='" + url + "'>" + text + "</a>";
	};
console.log(link("http://www.google.com"));      #=><a href='http://www.google.com'>http://www.google.com</a>
console.log(link("http://www.google.com","Google")); #=><a href='http://www.google.com'>google</a>
}).call(this);
{% endhighlight %}

###不定参数
在CS中要定义不定参数要使用*splat*操作符，即`...`。主要附加在参数名后方。

{% highlight coffeescript linenos %}
race = (winner, runners...) ->
  print winner, runners
{% endhighlight %}
runners可以接受任意数量的参数即（0到N），它将作为一个数组

> 不像Ruby，CS中的变参可以放在参数列表的任意位置。如`(a,b...,c)`,如果传入一个参数，a将被赋值，如果传入连个够参数，a、c将被赋值，如果3个以上的参数，首尾分别赋予a、c，其余的付给b

##Note 8 集合与对象
###数组
CS中的数组和JS的没什么区别，CS提供了便捷的操作方法。
*in关键字*
要检测数组是否包含使用`in`关键字：

{% highlight coffeescript linenos %}
myArray=["a","b","c"]
if "b" in myArray
  console.log "I found b"
{% endhighlight %}

*解构赋值*
解构赋值在Ruby中是很常见的，比如我们可以使用这样的方式交换两个值：

{% highlight coffeescript linenos %}
a = 2
b = 5
[a,b] = [b,a]
{% endhighlight %}

{% highlight javascript linenos %}
(function(){
  var a,b,ref;
	ref=[b,a];
	a=ref[0],b=ref[1];
}).call(this);
{% endhighlight %}

CS没有类似JS提供单行对多个值赋值的方法,如`a=7,b=10`这样的语法是错误的。但是可以通过解构赋值来实现：
{% highlight coffeescript linenos %}
[a,b,c] = [1,2,3]
{% endhighlight %}

{% highlight javascript linenos %}
(function(){
  var a,b,c,ref;
	ref=[1,2,3];
	a=ref[0],b=ref=[1],c=ref[2];
}).call(this);
{% endhighlight %}

另外还支持在数组中使用splat表达式。效果同前面说的一样

{% highlight coffeescript linenos %}
[a,b...,c]=[1,5]
console.log a #=>1
console.log b #=>[]
console.log c #=>5
{% endhighlight %}

*Range*
CS参考Ruby也引入了Range（区间）比如`[1..5]`等价于`[1,2,3,4,5]`,而`[1...5]`则等价于`[1,2,3,4]`即不包含尾数.也可以反序如`[5..1]`等价于`[5,4,3,2,1]`.

> 遗憾的是CS的Range不支持字符形式的如，`['a'..'z']`

这些是作用于**数组字面量**。当Range作用于数组变量时,即**数组切片**，更能显现出它的威力。
比如用Range来获取数组的一部分：
{% highlight coffeescript linenos %}
myArray=[1..10]
myArray[..] #=> 获取所有值
myArray[-1..]  #=> 获取最后一个值
subArray=myArray[1..3]  #=> [2,3,4]
{% endhighlight %}

另外还可以对数组切片进行赋值：

{% highlight coffeescript linenos %}
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[3..6] = [-3, -4, -5, -6]  #=>[ 0, 1, 2, -3, -4, -5, -6, 7, 8, 9 ]
numbers[0..1] = [1]  #=>[ 1, 2, -3, -4, -5, -6, 7, 8, 9 ] 自动缩减
{% endhighlight %}

###对象（散列）
JS的对象比较简单，其实就是其他语言中的哈希表。之所以称为对象，在笔者看来是因为它可以简单地封装属性和方法。在JS中函数就像一个普通的数据类型，可以简单地付给一个变量。在一个散列表中封装了一个对象模型的的属性和一些操作，这就是最简单的“对象”了。在C语言编写时，我也经常使用struct来封装一个数据对象的属性和操作。我们将它称为”面向对象编程模式”。当然这里只是说对象，至于面向对象的概念早就不这么简单了。
在CS中，对象的花括号是可以省略的：
{% highlight coffeescript linenos %}
obj =
  firstName: "lee"
	lastName:  "carney"
console.log obj
{% endhighlight %}

{% highlight javascript linenos %}

(function() {
  var obj;

  obj = {
    firstname: "lee",
    lastname: "carney"
  };

  console.log(obj);

}).call(this);
{% endhighlight %}
*@操作符*
在Ruby对象方法中是使用@variable这样的形式来获取和设置对象的属性的。CS也copy了这个语法。在CS的它只不过是this的简写：
{% highlight coffeescript linenos %}
obj =
  firstname:"lee"
  lastname:"carney"
  print: ->
    "#{@firstname} #{@lastname}"
console.log obj.print()
{% endhighlight %}

{% highlight javascript linenos %}

(function() {
  var obj;

  obj = {
    firstname: "lee",
    lastname: "carney",
    print: function() {
      return this.firstname + " " + this.lastname;
    }
  };

  console.log(obj.print());

}).call(this);
{% endhighlight %}

###遍历
*数组遍历*
CS遍历数组主要使用`for .. in ..`语法。
{% highlight coffeescript linenos %}

letters = ["a","b","c"]
for letter in letters
  console.log letter.toUpperCase()
{% endhighlight %}

使用`by`关键字设置步长
{% highlight coffeescript linenos %}
numbers = [1..10]
for number in numbers by 2
  console.log number #=>1 3 5 7 9
{% endhighlight %}

使用`when`关键字设置条件
{% highlight coffeescript linenos %}
numbers = [1..10]
for number in numbers by 2 when number < 5
  console.log number  #=> 1 3
{% endhighlight %}

*对象遍历*
CS遍历对象主要使用`for key,value of object`的形式
{% highlight coffeescript linenos %}
person =
  firstname:"lee"
  lastname:"carney"

for key,value of person
  console.log "#{key} is #{value}" #=>firstname is lee
                                   #lastname is carney
{% endhighlight %}

> 遍历对象不支持`by`关键字,可以使用`when`

使用`own`关键字遍历非继承属性
在JS中，可以使用prototype函数给所有系统对象添加函数或者属性,比如：
{% highlight coffeescript linenos %}
Object.prototype.birthdate=new Date()
person =
  firstname:"lee"
  lastname:"carney"

for key,value of person
  console.log "#{key} is #{value}"  #birthdate is ..
{% endhighlight %}

这样在遍历对象是就会遍历到从父对象继承而来的属性。
为了排除父对象的属性，可以使用`for own`代替`for`
{% highlight coffeescript linenos %}
Object.prototype.birthdate=new Date()
person =
  firstname:"lee"
  lastname:"carney"

for own key,value of person
  console.log "#{key} is #{value}"
{% endhighlight %}

*异步调用共享变量问题*
{% highlight coffeescript linenos %}
for i in [0..5]
  setTimeout(->
    console.log i
  ,1)
{% endhighlight %}
JS代码：
{% highlight javascript linenos %}

(function() {
  var i, j;

  for (i = j = 0; j <= 5; i = ++j) {
    setTimeout(function() {     //这里的匿名函数就是一个闭包，它可以访问外嵌函数
      return console.log(i);    // 的所有活动对象，这里是i变量。其实循环中的这
    }, 1);                      //些闭包都是引用同一个变量i
  }

}).call(this);
{% endhighlight %}
上面的调用输出六次6，与我们期望的不一样，这是因为在等待打印的过程中，循环完毕后i的值尾6，而所有异步调用函数都是**共享**这i这个变量，所以输出值都是一样的
我们可以通过增加一个匿名函数包含闭包，如：

{% highlight javascript linenos %}

(function() {
  var i, j;

  for (i = j = 0; j <= 5; i = ++j) {
    setTimeout((function(num){   //使用一个匿名函数包装闭包
    return function() {
      return console.log(num);
    }
    })(i), 1);
  }

}).call(this);
{% endhighlight %}

因为JS中的函数是按值传递的，所以每个匿名函数都会保存一个特定时刻变量值的副本，加上闭包就可以正常输出了。

> 关于闭包的话题，可以查阅《JS高级编程》第七章

CS提供了一个关键字`do`来简化这个过程：
{% highlight coffeescript linenos %}

for i in [0..5]
  do (x) ->
    setTimeout(->
        console.log num
    ,1)

{% endhighlight %}

{% highlight javascript linenos %}

(function() {
  var fn, i, j;

  fn = function(x) {
    return setTimeout(function() {
      return console.log(num);
    }, 1);
  };
  for (i = j = 0; j <= 5; i = ++j) {
    fn(x);
  }

}).call(this);
{% endhighlight %}

##Note 8 类
> 建议在阅读本节前熟悉JS面向对象原理

JS对面向对象的支持非常弱，就比如构建一个对象就有好几种方法，比如构造函数法，原型方法。要实现继承也是非常繁琐的，根本就不能好好的玩耍。这时候CS出现了，有时候我们应该不应该陷入语言的细节里面，CS让我们能够轻松地构造类和实现继承。当然这些都是基于JS，在这里重申，JS做不到的事情，CS也是鞭长莫及的。

###定义类
使用`class`关键字定义一个“类”
{% highlight coffeescript linenos %}
class Person

person1 = new Person
{% endhighlight %}
JS代码：
{% highlight javascript linenos %}

(function() {
  var Person, person1;

  Person = (function() {  
    function Person() {}

    return Person;

  })();

  person1 = new Person;

}).call(this);
{% endhighlight %}
Person函数就是Person类的构造函数，在JS中，构造函数和和普通函数没什么区别，真正起作用的是`new`关键字.它主要用于创建一个对象，并调用指定的函数，为该对象创建属性和方法

###构造函数
按CS的约定是在class内定义一个`constructor`函数如
{% highlight coffeescript linenos %}
class Person
  constructor: (name,age)->
    @name = name
    @age  = age

person1 = new Person("carney","20")
console.log person1
{% endhighlight %}
JS代码：
{% highlight javascript linenos %}
(function() {
  var Person, person1;

  Person = (function() {
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    return Person;

  })();

  person1 = new Person("carney", "20");

  console.log(person1);

}).call(this);
{% endhighlight %}

在constructor函数中定义的语句都会被放进JS的构造函数(Person)中。在构造函数中定义的属性和方法是*实例变量*.仿照Ruby的语法，这里使用`@`操作符进行定义。
实例变量和方法是归每个特定的实例所有的。后面会介绍*类变量*.

###定义方法
{% highlight coffeescript linenos %}
class Person
  constructor: (name,age)->
    @name = name
    @age  = age
  introduct: ->
    console.log "my name is #{@name}"

person1 = new Person("carney","20")
console.log person1
person1.introduct()

{% endhighlight %}

JS代码：
{% highlight javascript linenos %}

(function() {
  var Person, person1;

  Person = (function() {
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.introduct = function() {
      return console.log("my name is " + this.name);
    };

    return Person;

  })();

  person1 = new Person("carney", "20");

  console.log(person1);

  person1.introduct();

}).call(this);
{% endhighlight %}
CS把方法定义在*原型对象*上，让实例对象进行共享,每个实例对象都会引用一个原型对象，即`prototype`.实例对象可以访问原型对象上的属性和方法，如果是同一种类型的实例对象他们引用的是同一个原型对象。比如我们在Object原型对象上绑定一个sayhi方法，那么所有实例对象都可以访问这个方法。关于原型链的问题不是本文讨论的话题。

也可以在构造函数里面定义方法，不过不推荐这么做，因为它会给每一实例都定义函数。这会浪费内存。也没有什么好处。

###继承
CS的继承使用类似JAVA的语法
{% highlight coffeescript linenos %}

class Person
  constructor: (name,age)->
    @name = name
    @age  = age
  introduct: ->
    console.log "my name is #{@name}"


class Student extends Person
  constructor:(name,age,num) ->
    super
    @num=num

console.log(new Student("carney",21,2012254107))
{% endhighlight %}
> 调用super时无须显式传递参数，它会将函数中的所有参数都传递给父类同名方法。要是想传入特定参数可以手动指定

CS实现继承的原理也不是很复杂，主要是把父类所有非继承而来的属性和方法都赋值到子类上来，然后再对原型对象进行嫁接。

{% highlight javascript linenos %}

(function() {
  var Person, Student,
    hasProp = {}.hasOwnProperty, //判断是否为继承的函数
    extend = function(child, parent) { 
      for (var key in parent) {    //复制所有类方法，后面会介绍
        if (hasProp.call(parent, key)) 
          child[key] = parent[key]; 
      } 
      function ctor() { this.constructor = child; } 
      ctor.prototype = parent.prototype; 
      child.prototype = new ctor(); 
      child.__super__ = parent.prototype; 
      return child; 
      };

  Person = (function() {
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.introduct = function() {
      return console.log("my name is " + this.name);
    };

    return Person;

  })();

  Student = (function(superClass) {
    extend(Student, superClass);

    function Student(name, age, num) {
      Student.__super__.constructor.apply(this, arguments);
      this.num = num;
    }

    return Student;

  })(Person);

  console.log(new Student("carney", 21, 2012254107));

}).call(this);
{% endhighlight %}

###类方法和类变量
类方法就是不需要实例化就可以调用的方法。比如定义类方法：
{% highlight coffeescript linenos %}
class Test
  @sayHi:->      #类方法
    console.log "hi #{@myname}"
  @myname:"carney"  #类变量

Test.sayHi()   #=> hi carney
{% endhighlight %}

{% highlight javascript linenos %}

(function() {
  var Test;

  Test = (function() {
    function Test() {}

    Test.sayHi = function() {
      return console.log("hi " + this.myname);
    };

    Test.myname = "careny";

    return Test;

  })();

  Test.sayHi();

}).call(this);
{% endhighlight %}

> 其实它们就是普通对象里面的属性和方法。

##Note 9 原型函数
CS提供了一个简洁的符合来替换`prototype`函数，比如：
{% highlight coffeescript linenos %}
Array::size = -> @length
{% endhighlight %}

{% highlight javascript linenos %}
(function() {
  Array.prototype.size = function() {
    return this.length;
  };

}).call(this);
{% endhighlight %}

##Note 10 绑定
先来看看下面的例子：
{% highlight coffeescript linenos %}
foo = (callback) ->
  console.log "start"
  callback();
  console.log "end"

bar={
  name:"carney"
  sayhi:->
    console.log "hi #{@name}"
}

bar.sayhi() #=>hi carney
foo(bar.sayhi) #start \n hi undefined \n end
{% endhighlight %}

在foo函数调用中发现name属性是undefined。这是怎么回事呢？
在JS中函数是在特定的上下文环境中执行的，这个上下文的显式体现就是`this`和`arguments`.尚且把它们上面的foo函数展开等价于：
{% highlight javascript linenos %}
  foo = function() {
    console.log("start");
    (function(){
      return console.log("hi "+this.name);
    })();
    return console.log("end");
  };
{% endhighlight %}
在foo函数执行时，callback函数的上下文是指向foo的上下文的。也就是说this指向foo活动对象，而不是指向bar对象。

为了让callback能够正常的在bar的上下文运行，我们要使用apply函数对上下文进行绑定
{% highlight coffeescript linenos %}
foo = (callback,context) ->
  console.log "start"
  callback.apply(context,arguments)  #使用apply函数绑定上下文
  console.log "end"

bar={
  name:"carney"
  sayhi:->
    console.log "hi #{@name}"
}

bar.sayhi()
foo(bar.sayhi,bar)
{% endhighlight %}

像前面的一样，CS也提供了一个便捷的操作符来实现上下文绑定：
{% highlight coffeescript linenos %}
foo = (callback) ->
  console.log "start"
  callback()
  console.log "end"

bar={
  name:"carney"
  sayhi:=>
    console.log "hi #{@name}"
}

bar.sayhi()
foo(bar.sayhi)
{% endhighlight %}

编译代码如下：
{% highlight coffeescript linenos %}

(function() {
  var bar, foo;

  foo = function(callback) {
    console.log("start");
    callback();
    return console.log("end");
  };

  bar = {
    name: "carney",
    sayhi: (function(_this) {        //巧妙地使用了闭包实现了绑定，而且无须使用apply
      return function() {
        return console.log("hi " + _this.name);
      };
    })(this)

  bar.sayhi();

  foo(bar.sayhi);

}).call(this);
{% endhighlight %}

在类中也可以使用上下文绑定：
{% highlight coffeescript linenos %}
class Bar
  constructor:->
    @name="carney"
  foo : =>
    console.log "hi #{@name}"
{% endhighlight %}

JS:
{% highlight javascript linenos %}
(function() {
  var Bar,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bar = (function() {
    function Bar() {
      this.foo = bind(this.foo, this); #在实例化是绑定
      this.name = "carney";
    }

    Bar.prototype.foo = function() {
      return console.log("hi " + this.name);
    };

    return Bar;

  })();

}).call(this);
{% endhighlight %}
