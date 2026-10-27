# FREE Tide Sample — Editorial Mobile Prelander

面向 Meta 美国 SOI offer 的移动端 prelander。  
现在的主 offer 是 **FREE Tide Sample**，不再是 $500 reward。

**成品：** `index.html` + `assets/`  
**预览：** `preview.png`（Landing / 3 问 / 评论区 / Result）

---

## 1. 30 秒上线

1. 打开 `index.html`，搜索 `window.TIDE_REWARD_CONFIG`。
2. 把 `offerUrl` 换成你实际的 MaxConv / offer 链接。
3. Meta Pixel + MaxConv 已经在 `<head>`，不需要再粘：
   - Pixel ID：`1265921658956719`
   - MaxConv：`https://www.2timetowin.xyz/t/t.js`
4. 把 `index.html`、`assets/` 一起上传，保持相对路径。
5. 手机打开，确认 CTA 能跳转、Pixel `PageView` 正常。

```js
window.TIDE_REWARD_CONFIG = {
  offerUrl: "https://www.2timetowin.xyz/click",
  holdSeconds: 180
};
```

> 顶部倒计时默认 **03:00**。想更急可以改 150（02:30）。

---

## 2. 这版的重点

- **FREE 是主角**：H1 的 `FREE` 用红色 + 黄色下划线；CTA、timer、Result、sticky 全部重复 FREE。
- **主图用 `assets/tidep.webp`**：你放的 Tide 全家桶产品图，放在 Hero 和 Result，不再出现 $500 卡。
- **Result 改成 FREE sample**：`You're pre-qualified for a FREE Tide Sample.` + `Claim My FREE Sample` + `FREE Sample Box` 摘要。
- **Q3 改成 sample 选择**：Original liquid / Pods / Free & Gentle，选择会回显到 Result。
- **顶部 3 分钟 hold**：从进页开始，Landing / Quiz / Result 全程不重置；到 0 变成 `Hold expired — You can still continue`。
- **评论区图片**：使用你放进 assets 的两张真实感图；第一张里的 $500 卡面已用修补去掉，第二张本身没有 $500。
- **评论文案**：全部改成 free sample / sample box，不再提 $500。

---

## 3. 页面结构

1. 顶部固定 `Your FREE sample hold 03:00`。
2. Header：官方 Tide logo + `Tide Sample Program` + `Independent promotion` + `U.S. 18+`。
3. Hero：`Get Your FREE Tide® Sample.` + FREE sample 说明 + `Get My FREE Sample` + 产品全家桶图。
4. Rating：4.8 / 2,914 sample ratings。
5. How it works：3 问 → 查 availability → claim FREE sample。
6. Value band：`FREE means free.` + 3 条收益 + 第二个 CTA。
7. Community：4 条评论（2 条带图）+ 1 条 Sample Support 回复。
8. FAQ：是否真免费、sample 里有什么、谁可以参加、要不要钱、多久、之前领过怎么办。
9. Final CTA。
10. Quiz：US → 洗衣频率 → 想试哪个 sample。
11. Checking：1.8 秒。
12. Result：Pre-qualified + FREE sample 图 + Sample/Status + `Claim My FREE Sample`。
13. Sticky bottom CTA。

---

## 4. 问题逻辑

```text
Q1  Do you live in the United States?
    Yes → Q2
    No  → 退出页

Q2  How many loads of laundry do you do in a typical week?
    1–2 / 3–4 / 5 or more → 全部通过

Q3  Which FREE Tide sample would you like to try first?
    Original liquid / Pods / Free & Gentle
    → 全部通过，进入 checking
```

Q3 的选择会显示在 Result：`Your FREE sample pick: Pods` 等。

---

## 5. 追踪

### Meta Pixel（已内置）

`<head>` 里已有标准 Pixel，ID `1265921658956719`，加载即发 `PageView`。

页面自定义事件：

- `StartCheck`
- `CompleteCheck`
- `Qualified`
- `Disqualified`

> **没有**再从落地页发 `fbq('Lead')`：转化由 MaxConv 的 conversion 回传（CAPI）上报，避免 Meta 侧重复计数。  
> 如果要在 Meta 里看 LP 的 CTA 点击，请在 MaxConv 侧看，不要加 fbq Lead。

### MaxConv（已内置）

`<head>` 已包含：

- `delegate-ch` meta
- `https://www.2timetowin.xyz/t/t.js`
- noscript 的 `t/t.css`
- CTA 指向 `offerUrl`，由 MaxConv 处理跳转/追踪

### 参数透传

`fbclid` / `utm_*` / tracker 自定义参数会自动拼到 `offerUrl`。

---

## 6. 素材

| 文件 | 说明 |
|---|---|
| `assets/tidep.webp` | 你提供的 Tide 全家桶产品图，Hero + Result |
| `assets/comment-card.webp` | 你提供的评论图；$500 卡面已修补移除 |
| `assets/comment-shelf.webp` | 你提供的洗衣房货架图，无 $500 |
| `assets/tide-logo.webp` | 官方圆形 Tide logo，透明底 |
| `assets/avatars/*.webp` | 60+ 头像 |

替换图片时保持文件名不变，页面不用改。

---

## 7. 性能

- HTML 约 **80KB**，gzip 后约 **19KB**。
- 图片总计约 **297KB**，全部本地 WebP。
- 第三方脚本：Meta Pixel + MaxConv。
- Hero 预加载，评论图/头像懒加载。
- 不需要构建。

---

## 8. 合规 / 注意

1. **Free sample 的可用性**：FAQ 和 footer 已写“sample availability is limited”“final claim may include sponsored offers”。请确保与实际 offer 一致。
2. **One sample per household**：Terms/FAQ 已写；offer 页会确认 previous sample history。
3. **评论是示例素材**：图片由你提供；文案是示例 testimonial。正式放量前请确认可核验，或替换成真实用户素材。
4. **官方 logo**：页面已写 independent promotion、not affiliated with P&G；正式投前确认品牌引用允许。
5. **顶部倒计时**：前端会话计时，不是真实库存锁定；到 0 仍可继续。
6. **`robots noindex,nofollow`**：prelander 不需要收录；要收录就删掉。

---

## 9. 测试清单

- [x] 320 / 360 / 375 / 390 / 414 / 430 无横向滚动
- [x] 320×700 Result CTA 完整可见
- [x] 375×667 / 360×640 Result CTA 完整可见
- [x] Q1 No → U.S. only 退出页
- [x] Q3 选择回显到 Result
- [x] 顶部计时从 03:00 递减，跨步骤不重置
- [x] 计时到 0 后 CTA 仍可点
- [x] `fbclid` / `utm_*` 透传
- [x] Meta Pixel / MaxConv 脚本加载，无 JS 报错
- [x] 页面无 $500 文案 / 无 $500 图片引用
- [x] 评论区第一张图已移除 $500 卡面
