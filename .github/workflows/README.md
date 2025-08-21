# GitHub Actions Workflows

Este repositório possui dois workflows automatizados que funcionam de forma independente:

## 🔄 **Deploy Automático (nextjs-github-pages.yml)**

**Quando executa:**

- ✅ A cada push na branch `master`
- ✅ Manualmente via Actions tab

**O que faz:**

1. Build do projeto Next.js
2. Deploy automático para GitHub Pages
3. Cache otimizado para builds mais rápidos

**Configurações:**

- Concorrência controlada (cancela builds antigos)
- Cache de dependências
- Deploy otimizado para sites estáticos

---

## 🏷️ **Releases Automáticos (pre-releases.yml)**

**Quando executa:**

- ✅ Apenas quando criar tags de versão (ex: `v1.0.0`, `v2.1.3`)
- ✅ Manualmente via Actions tab

**O que faz:**

1. Cria release automático com tag "latest"
2. Marca como "prerelease" para desenvolvimento
3. Inclui arquivos específicos (LICENSE)

---

## 🚀 **Como Usar:**

### **Para Deploy Automático:**

```bash
git add .
git commit -m "Atualização do site"
git push origin master
# Workflow executa automaticamente
```

### **Para Criar Release:**

```bash
git tag v1.2.0
git push origin v1.2.0
# Workflow de release executa automaticamente
```

---

## ⚡ **Benefícios da Separação:**

1. **Sem execução dupla** - Cada workflow tem seu propósito
2. **Deploy mais rápido** - Sem interferência do workflow de release
3. **Releases controlados** - Apenas quando necessário
4. **Melhor performance** - Builds não são interrompidos

---

## 🔧 **Configurações:**

- **Node.js**: 20.10.0
- **Cache**: Automático para dependências
- **Concorrência**: Controlada para evitar conflitos
- **Permissões**: Otimizadas para cada workflow
