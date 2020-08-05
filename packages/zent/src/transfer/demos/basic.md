---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```js
import { useState } from 'react';
import { Transfer } from 'zent';

const data = new Array(20)
	.fill()
	.map((_, index) => ({
		option: String(index),
		text: `option${index}`,
		disabled: index === 1 || index === 3 || index === 5 || index === 10,
	}));

const columns = [
	{
		name: 'text',
	},
];

const [targetKeys, setTargetKeys] = useState(['5', '9', '10', '15']);

ReactDOM.render(
	<div>
		<Transfer
			keyName="option"
			dataSource={data}
			targetKeys={targetKeys}
			onChange={({ targetKeys }) => setTargetKeys(targetKeys)}
			list={{ columns }}
		/>
	</div>,
	mountNode
);
```
