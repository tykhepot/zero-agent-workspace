# QuantumNous New API 云服务器部署计划 (Apr 6, 2026) 🦞

## ✅ 项目分析完成

**项目名称:** QuantumNous/new-api  
**GitHub:** https://github.com/QuantumNovus/new-api  
**类型:** AI 模型网关和资产管理平台（基于 One API）  
**技术栈:** Go + PostgreSQL + Redis + Docker Compose  

---

## 🚨 SSH 访问问题

当前云服务器 `43.167.215.216` **SSH 密码认证被禁用**，无法直接通过 password 登录。

### 解决方案选项：

#### Option A: 生成 SSH Key（推荐）⭐
```bash
# 在本地 Mac Studio M3 上执行
ssh-keygen -t ed25519 -C "zero@quantumnous-deploy"
cat ~/.ssh/id_ed25519.pub >> /tmp/authorized_keys

# 然后你需要：
# 1. 通过云服务商控制台（阿里云/AWS/腾讯云等）的 VNC/Web Console 
#    将 `/tmp/authorized_keys` 内容添加到 `~ubuntu/.ssh/authorized_keys`
# 2. 或者在云控制台的"安全组/SSH Key"中添加公钥

# 之后就可以直接 SSH：
ssh -i ~/.ssh/id_ed25519 ubuntu@43.167.215.216
```

#### Option B: 本地 Docker Compose 部署（如果服务器已安装 Docker）
如果你能**手动登录到服务器控制台**，可以直接在服务器上执行：

```bash
# SSH Key auth after setup (Option A first)
ssh ubuntu@43.167.215.216

cd ~/new-api || mkdir -p ~/new-api && cd ~/new-api

curl -sL https://raw.githubusercontent.com/QuantumNous/new-api/main/docker-compose.yml > docker-compose.yml

# 修改密码（安全起见！）
sed -i 's|POSTGRES_PASSWORD: 123456|POSTGRES_PASSWORD: Guofeng@NewAPI2026!|g' docker-compose.yml
sed -i "s|SQL_DSN=postgresql://root:123456|SQL_DNS=postgresql://root:Guofeng@NewAPI2026!|g" docker-compose.yml

# 启动服务
docker compose up -d

echo "✅ Done! Access at http://43.167.215.216:3000"
```

#### Option C: 使用云服务商的远程命令执行功能
- **阿里云 ECS:** 通过实例连接 → 运行命令  
- **AWS EC2:** Systems Manager Run Command  
- **腾讯云/华为云等:** 类似的功能  

---

## 📋 Deployment Checklist（部署清单）

### Pre-deployment:
1. ✅ SSH Key setup (Option A) - **需要用户手动完成**
2. ⏳ Verify Docker installed on server (`docker --version`)
3. ⏳ Check port 3000, 5432 open in security group/firewall

### Deployment Steps:
```bash
# Step 1: Create directory and download config
mkdir -p ~/new-api && cd ~/new-api
curl -sL https://raw.githubusercontent.com/QuantumNous/new-api/main/docker-compose.yml > docker-compose.yml

# Step 2: Update passwords (SECURITY CRITICAL!) ⚠️
sed -i 's|POSTGRES_PASSWORD: 123456|YOUR_SECURE_PASSWORD_HERE|g' docker-compose.yml
sed -i "s|SQL_DSN=postgresql://root:123456|SQL_DNS=postgresql://root:YOUR_SECURE_PASSWORD_HERE|g" docker-compose.yml

# Step 3: Start services
docker compose up -d

# Step 4: Verify status (wait ~8 seconds)
sleep 8 && docker ps | grep new-api
```

### Post-deployment:
- ✅ Access URL: `http://43.167.215.216:3000`  
- ⚠️ Default credentials need to be set in admin panel after first login  
- 📊 Check logs: `docker compose logs -f new-api`

---

## 🔐 Security Notes（安全提醒）

**必须修改的默认配置：**
```yaml
# docker-compose.yml 中的这些字段：
POSTGRES_PASSWORD: Guofeng@NewAPI2026!  # ⚠️ Change from "123456"
SQL_DSN=postgresql://root:Guofeng@NewAPI2026!  # ⚠️ Match above password

# Optional but recommended for production:
SESSION_SECRET=<random-secure-string>  # Multi-node deployment only
```

---

## 📝 Next Steps（下一步）

**需要你确认：**
1. ✅ SSH Key setup - **你可以通过云服务商控制台完成吗？**  
2. ⏳ Docker installed on server? (需要验证)  
3. ⏳ Port 3000 open in firewall/security group?  

一旦 SSH access ready，我可以立即执行完整部署脚本！

---
*Created: April 6th, 2026 - Zero's Deployment Plan for QuantumNous New API 🦞✨*
