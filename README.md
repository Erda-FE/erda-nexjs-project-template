# Erda NextJs Project Template

Erda 前端快速建站模板工程

## 特性

- 🚀 &nbsp; NextJs 自动实现 SSR

- 💼 &nbsp; Erda-UI 编码习惯

- 🥽 &nbsp;  全套 Lint 校验与自动格式化处理 ESLint + tsc + Pritter

- 🍻 &nbsp;  集成 Erda CI/CD

## 技术选型

### 框架

React v17 + NextJs v11

### 组件库

Antd 4.x

### 状态管理

cube-state

### 包管理

pnpm

### 样式

tailwindcss v2

### 图标管理

icon-park

### Utils

lodash + dayjs + react-use

## 快速开始

1. 选择 fork 或拷贝本工程
2. `pnpm i`
3. 在根目录创建一个`.env`文件

```javascript
OPENAPI_ADDR=http://xxx.services.svc.cluster.local:8080  // 你的后端服务地址
DISABLE_ERROR_OVERLAY=true // 是否需要隐藏Next特有的错误弹窗
```

4. `npm start`
5. 访问`http://localhost:3000`

## 使用方法

### 页面组件

遵照[NextJs](https://nextjs.org/docs/basic-features/pages)的规则，页面路由需要按照文件夹的结构编写

### 路由

需要获取路由参数

```javascript
import { useRouter } from 'next/router';

const Comp = (props: WithRouterProps) => {
  const router = useRouter(); // 包含所有路由信息
  React.useEffect(() => {
    if (router.isReady) { // isReady 表示在客户端渲染完成，此时才能拿到正确的query
      ...
    }
  }, [router]);
  ...
}

// 或者
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';

const Comp = ({ router }: WithRouterProps) => {
  React.useEffect(() => {
    // 不需要判断isReady，可以直接拿到参数
  }, [router]);
  ...
}

export default withRouter(Comp);
```

### 样式管理

使用`tailwind`的[JIT](https://tailwindcss.com/docs/just-in-time-mode)模式，如果遇到预设不能提供的样式可以直接自己创建无需到主配置文件中添加配置。如

![image-20211014143550317](https://kuimo-markdown-pic.oss-cn-hangzhou.aliyuncs.com/image-20211014143550317.png)

**请注意**：

- 当需要使用运行时拼接的 class 时，需要手动将所有可能值都添加到`safelist`配置中
- 如果遇到需要覆盖组件库样式时，可能需要添加`!`前缀来开启 important
- 需要使用 scss 时，请书写 module 级别的 scss，在 demo 中有例子

### 代码提交

**请注意**：

- 本工程开启了`@typescript-eslint/no-explicit-any`，所以包含`any`的代码是会报 lint 错误且无法被提交的，必须 any 时请添加具体`@ts-ignore`
- 提交代码前会自动检查 lint 以及跑 type check(tsc)，任何警告以上的问题都会导致提交失败
- 无需考虑代码格式问题，提交前会自动由 Pritter 做代码格式化

### Debug

预设了`launch.json`，在 vscode 中启动 debug，选择`debug full stack`，即可在 vscode 中直接调试代码

### 部署/发布

需要更改几处配置的应用名，包括

- erda.yml
- pipeline.yml

然后就可以在 erda 上一键部署了
