import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true, // 生成类型定义文件
  minify: true, // 压缩输出
  sourcemap: false, // 生成源映射
  treeshake: true, // 去除未使用的代码
  splitting: true, // 拆分输出为多个文件
  clean: true, // 在构建前清理输出目录
  outDir: 'dist', // 输出目录
  entry: ['src/index.tsx'], // 输入文件或入口点
  format: ['esm', 'cjs'],
  external: ['react', 'react-dom'],
  loader: {
    '.css': 'css'
  },
  injectStyle: true
})
