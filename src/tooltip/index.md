# Tooltip

- category: Components
- chinese: 文字提示
- type: 展示

---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

## API

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| placement | 气泡框位置，可选 `top/left/right/bottom/topLeft/topRight/bottomLeft/bottomRight/leftTop/leftBottom/rightTop/rightBottom` | string     | top    |
| title     | 提示文字                                 | string/jsx | 无     |
