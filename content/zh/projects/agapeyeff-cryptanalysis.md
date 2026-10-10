---
layout: layouts/project.njk
order: 6
translationKey: cryptanalyse-agapeyeff
category: "科研"
thumbnail: "assets/img/cryptanalyse-agapeyeff/cryptogram-original-en.png"
title: "阿加佩耶夫密码破译"
description: "对阿加佩耶夫密码（1939 年）的密码分析，87 年来一直未被破解：重建的求解器、250 万字符的语料库，以及一个有完整记录的否定结果。"
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo 标志"
    url: "https://doi.org/10.5281/zenodo.22057249"
hero:
  type: image
  src: "assets/img/cryptanalyse-agapeyeff/cryptogram-original-en.png"
  alt: "1939 年印刷的阿加佩耶夫密码，392 个数字，每五个一组"
gallery:
  - src: "assets/img/cryptanalyse-agapeyeff/polybius-grid-en.png"
    alt: "把一对数字解码为 5×5 波利比奥斯方阵坐标的示意图"
stats:
  - value: "87 年"
    label: "自 1939 年起一直未破解"
  - value: "3,753,383"
    label: "已记录的尝试次数"
downloads:
  - label: "报告，法语版（PDF）"
    href: /assets/downloads/cryptanalyse-agapeyeff/rapport-fr.pdf
  - label: "报告，英语版（PDF）"
    href: /assets/downloads/cryptanalyse-agapeyeff/report-en.pdf
publications:
  - title: "The D'Agapeyeff Cryptogram (1939): Anatomy, Reconstruction of a Solver, and Statistical Assessment"
    doi: "10.5281/zenodo.22057249"
    date: "2026-08-22"
    lang: en
    type: ScholarlyArticle
  - title: "Data and code of computational cryptanalysis of the D'Agapeyeff cryptogram (1939)"
    doi: "10.5281/zenodo.21970478"
    date: "2026-08-17"
    lang: en
    type: CreativeWork
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
我尝试用计算密码分析的方法，破解亚历山大·阿加佩耶夫（Alexander D'Agapeyeff，1902 至 1955 年，制图师兼英国皇家空军军官）在他的手册《密码与暗号》（*Codes and Ciphers*，牛津大学出版社，1939 年）初版末尾发表的那道挑战密码。此后无人破解，它的 392 个数字甚至在后来的版本中消失了。这是一项独立研究。

## 密码

这 392 个数字两两成对，读作 5×5 波利比奥斯方阵里的坐标，得到一条 196 个符号的信息。接下来要弄清楚的是，在这之上还用了哪种密码、哪种语言、什么密钥。

## 第一个求解器必须重建

第一个难题不是来自密码，而是来自求解器。它的第一版以一个事先设定、从未验证过的分数阈值，来判断某个结果是否有希望。连续计算三天之后，没有任何结果越过这个阈值。最容易得出的结论是：文本不是英语，或者阿加佩耶夫自己出了错。

我选择去检验阈值本身。拿《傲慢与偏见》里的一段真实文字，用同一个模型打分，也没有达到它。这个阈值即使对真正的英语文本也遥不可及，因为语言模型只用 8000 个字符训练过。

## 重建后的求解器

我围绕四个想法重建了求解器。

- **更强的语言模型。**一个超过 250 万字符的语料库（来自古登堡计划的公有领域小说），以及四元组（quadgram），也就是 456,976 种四字母组合，而不是三元组的 17,576 种。
- **自我校准的参照。**每次搜索前，程序先用自己的机制加密一段已知文本，再尝试还原它。得到的分数取代了那个任意设定的阈值。
- **系统化搜索。**四类密码（替换、简单换位、弗莱斯纳格栅、双重换位），加上四方密码（Four-square），九种转录假设和三种语言（英语、法语、音译希伯来语），用模拟退火和自适应多臂老虎机算法探索，使用编译代码（Numba）和两阶段扫描，确保覆盖整个搜索空间。
- **空白基线校准。**每个结果都与在随机打乱的密码文本上做同样搜索的结果比较，以区分真实信号与统计假象。

对于四方密码，我甚至测量了退火的设置。40 次重启、每次 300,000 次迭代，在 83% 的测试中找到正确的密钥；而 20 次重启、每次 250,000 次迭代只有 58%。

## 结果

在方法 A 到 D 上，我没有检测到任何统计上能与噪声区分开的信号，并通过两轮独立的扫描保证了 100% 的覆盖。四方密码的搜索空间覆盖了 20.9%，同样没有信号。这是一个否定结果，但我连同相关的代码和数据对它做了详细记录，让这项研究可以从它停下的地方精确地继续。

## 引用这项工作

这项工作以开放获取的方式发表在 Zenodo 上。
