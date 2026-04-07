'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Copy, CheckCircle2, Terminal, Zap, Shield, Star, Rocket, ArrowRight,
} from 'lucide-react';

// Service data structure (sorted by price: low to high)
const services = [
  {
    id: 'free',
    name: '免费安装服务',
    IconComponent: Terminal,
    color: '#165DFF', // primary blue
    badge: '免费',
    price: '',
    description: '分享网站即可获取免费密钥 · 零基础远程指导适配全系统 (Windows/macOS/Linux)',
    features: [
      '✅ Node.js 版本自动检测与升级 (22.14+/24.x)',
      'npm mirror 国内网络优化加速',
      'Port 18789 端口冲突自动处理',
      '基础环境依赖一键安装'
    ],
    command: 'npx @openclaw/installer/free --share-site',
    ctaText: '复制命令 →',
    popular: false,
  },
  {
    id: 'model-config',
    name: '大模型配置服务',
    IconComponent: Terminal,
    color: '#FF7D00', // accent orange
    badge: '¥9.9/次',
    price: 9.9,
    description: '上传 openclaw.json · 修复/添加/删除大模型适配 LM Studio/OpenRouter/自定义接口',
    features: [
      '🔧 一键配置 LM Studio 本地模型',
      '⚡ OpenRouter API Key 快速接入',
      '✨ 支持自定义推理后端 (vLLM/Ollama)',
      '💾 JSON Schema 自动验证'
    ],
    command: 'npx @openclaw/installer/model --config',
    ctaText: '立即配置 →',
    popular: false,
  },
  {
    id: 'premium-setup',
    name: '配置优化服务',
    IconComponent: Zap,
    color: '#36CFC9', // secondary cyan
    badge: '¥29.9/终身',
    price: 29.9,
    description: '含记忆系统插件部署 · 微信/飞书聊天对接基础参数调优一次付费终身使用',
    features: [
      '🎁 包含免费服务所有功能',
      '💾 Memory Plugin 长期记住你的偏好',
      '💬 微信连接引导与优化设置 (支持群聊)',
      '⚡ 启动速度提升 30% + 内存占用降低'
    ],
    command: 'npx @openclaw/installer/premium --config',
    ctaText: '购买密钥 →',
    popular: true,
  },
  {
    id: 'clean-uninstall',
    name: '干净卸载服务',
    IconComponent: Shield,
    color: '#EF4444', // red for uninstall (warning)
    badge: '¥59.9/次',
    price: 59.9,
    description: '完全清除所有文件缓存注册表无残留支持重装无冲突，适合反复安装失败用户',
    features: [
      '🗑️ 彻底清理 ~/.openclaw/目录',
      '🔧 修复 PATH 环境变量中的错误配置',
      '💀 强制终止并删除所有 OpenClaw 相关进程',
      '✨ 系统环境恢复到安装前状态'
    ],
    command: 'npx @openclaw/installer/uninstall --deep',
    ctaText: '购买卸载密钥 →',
    popular: false,
  },
  {
    id: 'ultimate-bundle',
    name: '旗舰全配版 (终身)',
    IconComponent: Rocket,
    color: '#FFD700', // gold for flagship
    badge: '¥99/终身',
    price: 99,
    description: '一键安装 + 全配置优化含记忆/微信/飞书/大模型全对接 · 终身无限次卸载重装机器绑定专属密钥仅本机可用',
    features: [
      '🎁 包含所有服务功能 (免费+付费)',
      '♾️ 终身免费无限次卸载/重新安装',
      '🔒 机器指纹绑定防止密钥共享',
      '⭐ VIP 优先技术支持通道'
    ],
    command: 'npx @openclaw/installer/ultimate --lifetime',
    ctaText: '购买旗舰专属 →',
    popular: true,
  },
];

// Free resources data (simplified list view)
const freeResources = [
  { id: 'commands', title: 'OpenClaw 命令大全 (中文详解)', IconComponent: Terminal, description: '按功能分类展示常用命令 · 基础/服务管理/模型配置/日志查看/插件安装...', color: '#165DFF' },
  { id: 'skills', title: '推荐 Skills 技能库 (开箱即用)', IconComponent: Star, description: '精选最佳实践的技能配置方案 · GitHub/GitHub Copilot/微信连接等热门集成 + 一键安装教程...', color: '#36CFC9' },
];

export default function Home() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  
  // Copy command to clipboard with visual feedback
  useEffect(() => {
    if (copiedCommand) {
      setTimeout(() => setCopiedCommand(null), 2000);
    }
  }, [copiedCommand]);

  const handleCopy = async (command: string, serviceId?: string) => {
    try {
      await navigator.clipboard.writeText(command);
      
      // Show toast notification
      if (!serviceId && command.includes('free')) {
        setCopiedCommand('main');
      } else if (serviceId) {
        setCopiedCommand(serviceId);
      }

    } catch (err) {
      console.error('Copy failed:', err);
      alert('⚠️ 复制失败，请手动选择并复制上面的代码块内容.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100 text-[#1a1a2e]">
      
      {/* ============ Navigation Bar ============ */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="#" className="flex items-center space-x-2 group hover:opacity-90 transition-opacity">
            <Terminal className="w-8 h-8 text-[#165DFF]" />
            <span className="text-xl font-bold tracking-tight">OpenClaw Installer</span>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            
            {['首页', '服务中心', '免费干货'].map((item, index) => (
              <a 
                key={index}
                href={`#${item === '首页' ? 'hero' : item === '服务中心' ? 'services' : 'free-resources'}`}
                className="hover:text-[#165DFF] transition-colors hover:underline decoration-[#165DFF] underline-offset-4"
              >{item}</a>

            ))}

          </div>

        </div>

      </motion.nav>


      {/* ============ Hero Section ============ */}
      <section id="hero" className="pt-32 pb-20 px-6 relative overflow-hidden">

        {/* Background decoration (subtle gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(22,93,255,0.08),transparent_70%)]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-5xl text-center relative z-10"
        >

          {/* Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block px-6 py-2 bg-[#165DFF]/10 border border-[#165DFF]/30 rounded-full text-sm font-medium mb-8"
          >

            🚀 OpenClaw 小白用户的一键安装神器 · 零基础也能玩转本地 AI
            
          </motion.div>


          {/* Main Title */}
          <h1 className="text-[4rem] md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight leading-none mb-8">

            OpenClaw<br />
            <span className="bg-gradient-to-r from-[#165DFF] via-[#36CFC9] to-[#FF7D00] bg-clip-text text-transparent">一站式安装平台</span>

          </h1>


          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 font-light">

            分享网站即可免费获取安装密钥 · 自动检测环境问题 · 一次性解决所有安装坑点<br />
            <span className="font-medium text-[#1a1a2e]">Windows / macOS / Linux</span>全系统支持，零基础也能轻松上手!

          </p>


          {/* Main Command Box (click to copy) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto mb-16"
          >

            <div 
              onClick={() => handleCopy('npx @openclaw/installer/free --share-site')}
              className="bg-white border border-gray-200 rounded-xl p-8 cursor-pointer hover:border-[#165DFF]/30 transition-all duration-300 shadow-lg group relative"
            >

              {/* Copy Button (visible on hover) */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy('npx @openclaw/installer/free --share-site'); }}
                className="absolute top-6 right-6 bg-[#165DFF]/10 hover:bg-[#165DFF] text-[#165DFF] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >

                {copiedCommand === 'main' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>已复制!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    <span className="hidden md:inline">复制命令</span><span className="md:hidden">复制</span>

                  </>
                )}

              </button>


              {/* Command Text */}
              <code className="text-lg font-mono text-[#165DFF] block break-all leading-relaxed select-text bg-gray-50 p-4 rounded-lg border border-gray-200">npx @openclaw/installer/free --share-site</code>

            </div>


            {/* Helper Tips (free badge) */}
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center space-x-3 bg-white/80 border border-gray-200 px-6 py-3 rounded-full inline-block shadow-sm">

              <span className="bg-green-100 border border-green-300 px-3 py-1 rounded-full text-green-700 font-medium flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>免费</span></span><span className="ml-2">分享网站即可获取密钥 · 每个密钥仅限使用一次 · 24 小时后过期</span>

            </p>


          </motion.div>


        </motion.div>


      </section>


      {/* ============ Services Section (5 cards sorted by price) ============ */}
      <section id="services" className="py-20 px-6 bg-white border-t border-gray-100">

        <div className="container mx-auto max-w-7xl">

          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >

            <h2 className="text-[3rem] md:text-4xl font-bold tracking-tight mb-4 text-[#1a1a2e]">🎯 核心服务</h2>
            
            {/* Subtitle */}
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed opacity-80">复制对应命令即可开始使用 · 所有服务均包含基础安装功能</p>

          </motion.div>


          {/* Services Grid (sorted by price: low to high) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {services.map((service, index) => {
              const Icon = service.IconComponent;
              
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative bg-white border-2 rounded-xl p-8 hover:border-[#165DFF]/30 transition-all duration-300 group shadow-sm hover:shadow-lg"
                >

                  {/* Service Badge */}
                  <span 
                    style={{ backgroundColor: service.color }}
                    className="absolute -top-4 left-8 px-4 py-1.5 text-white font-bold text-xs rounded-full shadow-md z-10"
                  >{service.badge}</span>


                  {/* Icon + Title */}
                  <div className="flex items-center space-x-3 mb-6">

                    <Icon className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: `${service.color}15` }} />
                    
                    <h3 className="text-[2rem] font-bold tracking-tight">{service.name}</h3>

                  </div>


                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow space-y-1.5 opacity-90">
                    {service.description.split('\n').map((line, idx) => (
                      <span key={idx}>{line}<br /></span>

                    ))}

                  </p>


                  {/* Features List */}
                  <ul className="space-y-2 mb-8 text-sm">

                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 opacity-90"><CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5`} style={{ color: service.color }} /><span>{feature.replace(/^[^a-zA-Z\u4e00-\u9fa5]+/, '').trim()}</span></li>

                    ))}


                  </ul>


                  {/* Command Box (click to copy) */}
                  <button 
                    onClick={() => handleCopy(service.command, service.id)}
                    className="w-full bg-gradient-to-r from-gray-100 hover:bg-[#165DFF] border text-white py-4 rounded-lg font-mono text-xs transition-all duration-300 flex items-center justify-between group-hover:border-[#165DFF]"
                  >

                    {/* Command */}
                    <code className="text-left truncate mr-4 select-text">{service.command}</code>


                    {/* Copy Icon (visible on hover) + Success indicator */}
                    {copiedCommand === service.id ? (
                      <>
                        <CheckCircle2 className={`w-3 h-3 text-green-500 flex-shrink-0`} />
                        <span className="hidden md:inline">已复制!</span>

                      </>
                    ) : (
                      <>
                        <Copy className={`w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0`} /><span className="md:hidden">{service.ctaText}</span>

                      </>
                    )}


                  </button>


                </motion.div>


              );
            })}


          </div>


        </div>


      </section>


      {/* ============ Free Resources Section (simplified list view) ============ */}
      <section id="free-resources" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">

        <div className="container mx-auto max-w-5xl animate-fade-in-up">

          {/* Header */}
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[3rem] md:text-5xl font-bold tracking-tight mb-16 text-center"
          >🎁 免费干货 (全部开放)</motion.h2>


          {/* Resource List */}
          <div className="space-y-8 max-w-4xl mx-auto">

            {freeResources.map((resource, index) => {
              const Icon = resource.IconComponent;
              
              return (
                <a 
                  key={index}
                  href="#"
                  onClick={(e) => e.preventDefault()} // Placeholder for now
                  className={`block group hover:bg-white p-8 rounded-xl transition-all duration-300 border-l-[6px] cursor-pointer shadow-sm`}
                  style={{ borderColor: resource.color }}
                >

                  {/* Icon + Title */}
                  <div className="flex items-center space-x-4 mb-2">

                    <Icon className={`text-3xl group-hover:scale-110 transition-transform duration-300 inline-block`} style={{ color: resource.color }} />
                    
                    <h3 
                      className={`text-[2rem] font-bold tracking-tight text-gray-900 group-hover:text-[#165DFF] transition-colors`}
                    >{resource.title}</h3>

                  </div>


                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed ml-[5rem] max-w-lg opacity-90">{resource.description.split('\n').map((line, idx) => (idx > 0 ? ` ${line}` : line))}</p>

                </a>


              );
            })}


          </div>


        </div>


      </section>


      {/* ============ Footer (simplified) ============ */}
      <footer className="py-16 px-6 bg-white border-t border-gray-200">

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-[5rem] grid grid-cols-1 md:grid-cols-3 gap-12 text-sm leading-relaxed"
        >

          {/* Left: About */}
          <div className="space-y-4">

            {/* Logo + Title */}
            <h3 className={`text-[2rem] font-bold flex items-center space-x-2 mb-6`}>🦞 OpenClaw Installer</h3>


            {/* Description */}
            <p className="text-gray-500 max-w-md leading-relaxed opacity-90">为 OpenClaw 用户提供安装/配置/卸载/优化等一站式增值服务 · 零基础用户也能轻松上手本地 AI!</p>


            {/* Contact Info */}
            <div className="space-y-2 text-gray-600 pt-4">

              <a href="mailto:support@openclaw.com" className={`hover:text-[#165DFF] transition-colors flex items-center space-x-1.5 group`}>📧 support<span className="group-hover:underline">@</span>openclaw.com</a><p className="flex items-center space-x-2 text-gray-600"><span>💬 快捷咨询:</span><button onClick={() => handleCopy('npx @openclaw/installer/free --share-site')} className={`text-[#165DFF] hover:underline transition-colors`}>复制命令即可开始使用!</button></p>

            </div>


          </div>


          {/* Middle: Quick Links */}
          <div className="space-y-3 text-gray-600">

            <h4 className={`font-bold mb-[2rem] flex items-center space-x-1.5`}><span style={{ color: '#165DFF' }}>🔗</span><span>快捷入口</span></h4>


            {/* Links */}
            {['服务中心', '免费干货'].map((item, index) => (

              <a 
                key={index}
                href={`#${item === '服务中心' ? 'services' : item === '免费干货' ? 'free-resources' : ''}`}
                onClick={(e) => e.preventDefault()} // Placeholder for now
                className="block hover:text-[#165DFF] transition-colors group flex items-center space-x-1.5"
              >

                {item}<span className={`opacity-0 group-hover:opacity-100 ml-[2rem] text-xs`}>复制命令</span>

              </a>


            ))}


          </div>


        </motion.div>


      </footer>


    </div>
  );
}
