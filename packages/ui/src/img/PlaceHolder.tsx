import { memo, useEffect, useRef, useState } from 'react'

interface PlaceholderProps {
  className?: string
  loading?: boolean
}

export const Placeholder = memo<PlaceholderProps>(
  ({ className = '', loading = false }) => {
    const pathRef = useRef<SVGPathElement>(null)
    const [pathLength, setPathLength] = useState(0)

    useEffect(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength()
        setPathLength(length)
      }
    }, [])

    return (
      <svg
        className={`${className} transition-opacity duration-300 ease-in-out`}
        viewBox="0 0 100% 100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <style>
          {`
          @keyframes dash-animation {
            0% {
              stroke-dashoffset: ${pathLength};
            }
            50% {
              stroke-dashoffset: 0; /* 中间：路径完全描边 */
            }
            100% {
              stroke-dashoffset: ${-pathLength}; /* 逐渐消退 */
            }
          }
        `}
        </style>
        <rect width="100%" height="100%" fill="#F3F4F6"></rect>
        <svg
          x="25%"
          y="25%"
          width="50%"
          height="50%"
          viewBox="30 30 40 40"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          {/* 太阳图案 */}
          <circle cx="42" cy="42" r="5" fill="#D1D5DB"></circle>
          {/* 山形图案 */}
          <path
            d="M30 60L40 50L45 55L60 40L70 50V65C70 67.7614 67.7614 70 65 70H35C32.2386 70 30 67.7614 30 65V60Z"
            strokeWidth="0"
            stroke="#D1D5DB"
            fill="#E5E7EB"
          ></path>
          {/* loading状态时显示描边动画 */}

          <path
            ref={pathRef}
            d="M35 30H65C67.7614 30 70 32.2386 70 35V65C70 67.7614 67.7614 70 65 70H35C32.2386 70 30 67.7614 30 65V35C30 32.2386 32.2386 30 35 30Z"
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeDasharray={pathLength}
            strokeDashoffset={loading ? pathLength : 0} // 根据动画状态设置偏移
            style={{
              animation: loading
                ? `dash-animation 1.5s linear infinite` // 循环动画
                : 'none', // 停止动画
              transition: loading
                ? 'none'
                : 'stroke-dashoffset 0.3s ease-in-out' // 停止时平滑过渡
            }}
          ></path>
        </svg>
      </svg>
    )
  }
)

Placeholder.displayName = 'Placeholder'
