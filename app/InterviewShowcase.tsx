"use client";

import { useMemo, useState } from "react";

type Tab = "home" | "applications" | "prep" | "review" | "bank" | "profile";
type Application = { id: number; company: string; role: string; status: string; location: string; rounds: number };
type Question = { id: number; question: string; probability: string; framework: string; status: string };

const applications: Application[] = [
  { id: 1, company: "星河数据", role: "数据分析实习生", status: "面试中", location: "上海", rounds: 2 },
  { id: 2, company: "远山科技", role: "AI 产品实习生", status: "准备中", location: "上海", rounds: 1 },
  { id: 3, company: "海风研究院", role: "行业研究助理", status: "已投递", location: "远程", rounds: 0 },
];

const questions: Question[] = [
  { id: 1, question: "请介绍一个你主导的数据分析项目。", probability: "高", framework: "背景 → 目标 → 方法 → 结果 → 复盘", status: "待强化" },
  { id: 2, question: "业务指标下降时，你会如何定位原因？", probability: "高", framework: "口径确认 → 拆解漏斗 → 分群验证 → 行动建议", status: "练习中" },
  { id: 3, question: "为什么选择这个岗位？", probability: "中", framework: "动机 → 匹配证据 → 能贡献什么", status: "已掌握" },
  { id: 4, question: "如何处理数据结论与业务直觉冲突？", probability: "中", framework: "校验数据 → 理解场景 → 补充实验 → 对齐决策", status: "待强化" },
];

export default function InterviewShowcase() {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedId, setSelectedId] = useState(1);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [notice, setNotice] = useState("");
  const selected = applications.find((item) => item.id === selectedId) ?? applications[0];
  const currentQuestion = questions[practiceIndex % questions.length];
  const mastered = questions.filter((item) => item.status === "已掌握").length;
  const nav: Array<[Tab, string, string]> = [["home", "总览", "01"], ["applications", "岗位", "02"], ["prep", "准备", "03"], ["review", "复盘", "04"], ["bank", "错题", "05"], ["profile", "资料", "06"]];
  const funnel = useMemo(() => [["准备中", 1], ["已投递", 1], ["面试中", 1], ["Offer", 0]], []);

  function nextPractice() {
    if (!answer.trim()) return;
    setNotice("本次回答已在浏览器内完成演示，不会上传或保存。");
    setAnswer("");
    setPracticeIndex((value) => value + 1);
  }

  return <main className="shell">
    <aside className="sidebar"><button className="brand" onClick={() => setTab("home")}><b>面试档案</b><span>PUBLIC SHOWCASE</span></button><nav>{nav.map(([id, label, no]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><span>{no}</span>{label}</button>)}</nav><div className="identity"><span>产品展示版</span><strong>访客体验</strong><small>全部为虚构示例</small></div></aside>
    <section className="workspace">
      <header className="topbar"><div><small>2026年8月13日 · 星期四</small><strong>{nav.find((item) => item[0] === tab)?.[1]}</strong></div><div className="topActions"><button className="line" onClick={() => setTab("applications")}>查看岗位</button><button className="black" onClick={() => setTab("prep")}>开始练习</button></div></header>
      <div className="demoBanner"><strong>公开演示</strong><span>不连接私人数据库，不调用真实 AI，不上传简历或录音。</span></div>
      {notice && <div className="notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}

      {tab === "home" && <div className="page"><section className="hero"><p>INTERVIEW WORKSPACE · CASE STUDY</p><h1>准备有据，<br/>复盘有痕。</h1><span>把每个岗位、每次回答和每个薄弱点，沉淀成下一轮的优势。</span><div className="heroActions"><button className="black" onClick={() => setTab("applications")}>查看岗位 <b>→</b></button><button onClick={() => setTab("prep")}>模拟练习 <b>→</b></button><button onClick={() => setTab("review")}>查看复盘 <b>→</b></button></div></section><section className="metrics"><article><span>岗位档案</span><strong>{applications.length}</strong><small>正在推进 3</small></article><article><span>已完成轮次</span><strong>2</strong><small>虚构演示数据</small></article><article><span>复盘均分</span><strong>4.1</strong><small>五维评分，满分 5</small></article><article><span>待攻克错题</span><strong>{questions.length - mastered}</strong><small>共记录 {questions.length}</small></article></section><div className="dashboardGrid"><section className="panel wide"><PanelHead no="01" title="岗位进度"/><div className="applicationRows">{applications.map((item) => <button key={item.id} onClick={() => { setSelectedId(item.id); setTab("applications"); }}><div><small>{item.status}</small><strong>{item.company}</strong><span>{item.role} · {item.location}</span></div><div className="rowMeta"><b>{item.rounds}</b><span>轮面试</span><i>→</i></div></button>)}</div></section><section className="panel"><PanelHead no="02" title="最近一场"/><div className="nextRound"><span>8月18日 14:00</span><strong>业务负责人面试</strong><p>视频 · 中文 · 预计 45 分钟</p></div></section><section className="panel"><PanelHead no="03" title="高频薄弱点"/><div className="weakList">{questions.filter((item) => item.status !== "已掌握").slice(0, 3).map((item, index) => <div key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.question}</p><b>{item.status}</b></div>)}</div></section><section className="panel wide"><PanelHead no="04" title="求职漏斗"/><div className="funnel">{funnel.map(([label, count]) => <div key={String(label)}><strong>{count}</strong><span>{label}</span></div>)}</div></section></div></div>}

      {tab === "applications" && <div className="page"><PageTitle eyebrow="APPLICATIONS" title="岗位档案" copy="一份岗位材料，串联每一轮准备与复盘。"/><div className="masterDetail"><aside className="recordList">{applications.map((item) => <button key={item.id} className={selectedId === item.id ? "selected" : ""} onClick={() => setSelectedId(item.id)}><small>{item.status}</small><strong>{item.company}</strong><span>{item.role}</span><i>2026/08/12</i></button>)}</aside><section className="recordDetail"><div className="recordHeading"><div><span>{selected.status}</span><h2>{selected.company}</h2><p>{selected.role} · {selected.location} · 实习</p></div></div><div className="extractBar"><span>公开版展示岗位信息架构；原版支持从 JD 与简历中提取匹配重点。</span><button className="line" disabled>AI 功能已关闭</button></div><div className="formCard"><div className="formGrid"><label>岗位状态<input value={selected.status} readOnly/></label><label>工作地点<input value={selected.location} readOnly/></label><label className="full">岗位摘要<textarea value="分析业务数据、搭建指标体系，并将洞察转化为可执行建议。" readOnly/></label><label className="full">匹配证据<textarea value="具备 Python 数据分析、可视化和行业研究项目经验。" readOnly/></label></div></div><div className="sectionSplit"><h3>面试轮次</h3><span>{selected.rounds} 轮</span></div><div className="roundTimeline"><article><span>01</span><div><small>已完成</small><strong>HR 初面</strong><p>视频 · 中文 · 30 分钟</p></div><time>8月10日</time></article><article><span>02</span><div><small>待进行</small><strong>业务负责人面试</strong><p>视频 · 中文 · 45 分钟</p></div><time>8月18日</time></article></div></section></div></div>}

      {tab === "prep" && <div className="page"><PageTitle eyebrow="PREPARATION" title="结构化准备" copy="把岗位要求转成高概率问题，再用证据组织回答。"/><div className="prepLead"><div><span>{selected.status}</span><h2>{selected.company} · {selected.role}</h2><p>当前共有 {questions.length} 道重点题，建议优先练习高概率问题。</p></div></div><div className="questionToolbar"><strong>模拟练习</strong><span>第 {practiceIndex % questions.length + 1} / {questions.length} 题</span></div><section className="practice"><div className="practiceProgress"><i style={{ width: `${(practiceIndex % questions.length + 1) / questions.length * 100}%` }}/></div><small>{currentQuestion.probability}概率 · {currentQuestion.status}</small><h2>{currentQuestion.question}</h2><p><strong>建议框架：</strong>{currentQuestion.framework}</p><textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="在这里输入一次模拟回答……"/><div className="formActions"><button className="black" disabled={!answer.trim()} onClick={nextPractice}>完成并进入下一题</button></div></section><div className="questionList">{questions.map((item, index) => <article key={item.id}><span className="qIndex">{String(index + 1).padStart(2, "0")}</span><div className="qBody"><small>{item.probability}概率 · {item.status}</small><strong>{item.question}</strong><p>{item.framework}</p></div></article>)}</div></div>}

      {tab === "review" && <div className="page"><PageTitle eyebrow="REVIEW" title="面试复盘" copy="从转写文本中定位证据，再形成可执行的改进动作。"/><div className="setupNote"><strong>隐私保护</strong><span>公开版不提供音频上传。下方内容是完全虚构的示例复盘。</span></div><section className="analysis"><div className="analysisIntro"><span>业务负责人面试 · 示例</span><h2>结论清楚，但结果量化与业务取舍还可以更具体。</h2><p>候选人能够用结构化方法描述项目，建议补充指标变化、个人贡献和失败后的迭代。</p></div><div className="scoreGrid">{[["内容质量",4.2],["结构简洁",4.4],["岗位匹配",4.1],["证据具体",3.6],["表达应变",4.0]].map(([label, score]) => <div key={String(label)}><span>{label}</span><strong>{score}</strong><i style={{ width: `${Number(score) / 5 * 100}%` }}/></div>)}</div><div className="insights"><article><small>优势</small><strong>结构清楚</strong><p>能够先给结论，再说明分析路径和项目结果。</p></article><article><small>改进</small><strong>补充量化结果</strong><p>使用基线、变化幅度和最终影响增强可信度。</p></article><article><small>下一步</small><strong>练习追问</strong><p>准备“为什么这么做”和“还有什么方案”两类追问。</p></article></div></section></div>}

      {tab === "bank" && <div className="page"><PageTitle eyebrow="QUESTION BANK" title="错题与薄弱点" copy="不只收藏问题，而是记录诊断、框架与改写后的回答。"/><div className="bankList">{questions.filter((item) => item.status !== "已掌握").map((item, index) => <article key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.status}</small><h3>{item.question}</h3><p><strong>改进框架：</strong>{item.framework}</p></div></article>)}</div></div>}

      {tab === "profile" && <div className="page"><PageTitle eyebrow="PROFILE" title="候选人资料" copy="私人版可以维护简历文本与证据库；公开版只展示信息结构。"/><div className="profileGrid"><section className="panel"><PanelHead no="01" title="能力标签"/><div className="tagCloud"><span>Python</span><span>SQL</span><span>Tableau</span><span>数据分析</span><span>行业研究</span></div></section><section className="panel"><PanelHead no="02" title="隐私边界"/><p className="privacyCopy">本仓库不含真实姓名、联系方式、简历、投递记录、面试录音、转写文本、公司作业或私人数据库连接。</p></section></div></div>}
    </section>
  </main>;
}

function PanelHead({ no, title }: { no: string; title: string }) { return <div className="panelHead"><span>{no}</span><h2>{title}</h2></div>; }
function PageTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <section className="pageTitle"><div><p>{eyebrow}</p><h1>{title}</h1><span>{copy}</span></div></section>; }

