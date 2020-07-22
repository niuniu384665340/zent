---
order: 4
zh-CN:
	title: 自定义渲染列表
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品
	title7: JAVA
	title8: PHP
	title9: GO
	title10: .NET
en-US:
	title: render props
	title1: Hangzhou Youzan Technology Co. Ltd
	title2: Engineer
	title3: Back End Engineer
	title4: Front End Engineer
	title5: Operations Engineer
	title6: Product
	title7: JAVA
	title8: PHP
	title9: GO
	title10: .NET
---

```js
import { useState, useCallback, useMemo } from 'react';
import { Transfer, Grid, Tree } from 'zent';

const treeData = useMemo(
	() => [
		{
			id: 1,
			title: '{i18n.title1}',
			children: [
				{
					id: 2,
					title: '{i18n.title2}',
					children: [
						{
							id: 3,
							title: '{i18n.title3}',
							children: [
								{
									id: 7,
									title: '{i18n.title7}',
								},
								{
									id: 8,
									title: '{i18n.title8}',
								},
								{
									id: 9,
									title: '{i18n.title9}',
								},
								{
									id: 10,
									title: '{i18n.title10}',
								},
							],
						},
						{
							id: 4,
							title: '{i18n.title4}',
						},
						{
							id: 5,
							title: '{i18n.title5}',
						},
					],
				},
				{
					id: 6,
					title: '{i18n.title6}',
				},
			],
		},
	],
	[]
);

const transferDataSource = useCallback(() => {
	const result = [];
	function flatten(list = []) {
		list.forEach(item => {
			result.push(item);
			flatten(item.children);
		});
	}
	flatten(treeData);
	return result;
}, [treeData]);

const [datasets, setDatasets] = useState(transferDataSource());
const [targetKeys, setTargetKeys] = useState([]);
const transferData = useCallback(({ datasets, targetKeys }) => {
	setDatasets(datasets);
	setTargetKeys(targetKeys);
}, []);

ReactDOM.render(
	<div>
		<Transfer
			rowKey="id"
			datasets={datasets}
			targetKeys={targetKeys}
			transferChange={transferData}
			columns={[{ name: 'title' }]}
		>
			{({ direction, selectedRowKeys, changeSelectedRowKeys }) => {
				if ('left' === direction) {
					return (
						<Tree
							checkable
							size="small"
							data={treeData}
							onCheck={(checked, helpInfo) => {
								changeSelectedRowKeys(
									checked.filter(item => !targetKeys.includes(item))
								);
							}}
							checkedKeys={[...selectedRowKeys, ...targetKeys]}
							disabledCheckedKeys={targetKeys}
							expandAll
						/>
					);
				}
			}}
		</Transfer>
	</div>,
	mountNode
);
```