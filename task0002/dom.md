###DOM
######dom style对象包含着通过HTML的style特性制定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。对于短划线分割开的样式属性必须转换成驼峰大小写样式(如：font-family ---> style.fontFamily)
######"DOM2级样式"提供了getComputedStyle()方法。返回当前元素计算后的样式，是一个CSSStyleDeclaration对象