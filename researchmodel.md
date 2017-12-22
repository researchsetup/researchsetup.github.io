---
layout: post
tagline:
---

# Index

[The Model](#themodel)

* [Research as Optimization](#researchopt)

PhD Takeaways

* [PhD as Certification](#phdcert)
* [Applying for PhD](#applying)
* [Reviewing and Reading Papers](#reviewing)
  * [3 Types of Papers](#threepapers)
  * [Least Publishable Units](#lpu)

General Takeaways

* [Communication](#communication)
  * [Marketing](#marketing)
* [Why Research?](#whyresearch)
* [Unintended Outcomes](#badoutcomes)
* [The Assistant Professorship](#assprof)
* [Following the Crowd](#thecrowd)
* [Hammers w/out Nails](#hammer)
* [Perfection is the Enemy of Progress](#perfection)
* [Hard Problems vs Simple Problems](#hardprobs)
* [Academia vs Industry](#industry)


$$\definecolor{blue}{RGB}{18,110,213}
\newcommand{\red}[1]{\textcolor{red}{#1}}
\newcommand{\blue}[1]{\textcolor{blue}{#1}}
$$


# A "Probabilistic" Model of Research

Research is a complicated process.  It can be ovewhelming because it's not clear what being a good researcher means, and what it means to do [good work](http://www.cs.virginia.edu/~robins/YouAndYourResearch.html).  There is also a lot of advice floating around -- where does this advice come from? How can one systematically reason about the process?  

This document proposes one possible model that I use to reason about research.  I then use the model as a framing device to comment about research and ideas.  It also includes some examples when the author can think them up.  My hope is that you get bored of the document mid-way because it's blindingly obvious.  

[Pull requests and issues are appreciated!](https://github.com/researchsetup/researchsetup.github.io)


#### Caveats

I am primarily acquainted with computer science, and specifically [data management and visualization](http://cudbg.github.io/lab).  I have a very loose interpretation of "model", since I barely understand:

 $$\begin{align}
   P(happy) &= \frac{P(happy | cat) \times P(cat)}{P(cat | happy)}\\
          1 &= P(happy) + P(not happy)\end{align}$$


## <a name="themodel"></a> The Model

For simplicity, we assume a paper as the unit of research and build a model of the expected positive impact $E[impact\|p]$ of a paper $p$.  

Consider all possible outcomes $\mathbb{O}$, where $o\in\mathbb{O}$ is _some_ goodness value for a possible future $o$.  For example, $o$ could represent a product, another project, social change; its value could measure profits, social equality, happiness, etc. Let $\mathbb{O}_p\subseteq \mathbb{O}$ be the subset of outcomes that are affected by the paper.   We could add up all possible outcomes weighed by how probable they are if the paper is written:

$$E[impact | p] =  P(p) \sum_{o \in \mathbb{O}_p} o\times P(o | p)$$



$P(p)$ is the probability that the paper's claims actually hold.   This hinges on  your ability to collect evidence $evid$ to support the claims and the paper's assumptions $assum$ being true:  

$$P(p) \approx P(p | evid, assum) P(evid | you) P(assum)$$



To summarize, the impact of a paper is:

<center>
$$E[impact | p] = 
\blue{P(p | evid, assum) P(evid | you)} 
\red{P(assum)}
\red{\sum_{o \in \mathbb{O}_p} o\times P(o | p)}
$$
</center>



**Correctness: is the paper believable?**

$\blue{P(p \| evid, assum)}$ defines whether the evidence is good enough to prove the claim.  This is called experimental design and it should be 1.

$\blue{P(evid \| you)}$ is called _conducting research_ and should be close to 1.  

**Impact: does the paper matter?**

$\red{P(assum)}$ defines the scope of the applicability.  Understanding the market, trends, talking to practitioners increases the probability of picking a problem where the assumptions hold.

$\red{o\times P(o \| p)}$ defines the belief about whether or not the outcome $\red{o}$ is meaningful and how much the paper will increase its likelihood $\red{P(o \| p)}$.   

### <a name="researchopt"></a>Research as Optimization 

Of course, you  only have a limited view of the possible outcomes of your own work!  In otherwords, $\mathbb{O}_{you} \subset \mathbb{O}$.  It is very likely that you cannot imagine all but a small number of the possible outcomes:

$$\begin{align}
|\mathbb{O}_{you}| &\ll \mathbb{O}_p\\
\mathbb{O}_{you} &\not\subseteq \mathbb{O}_p
\end{align}$$


Thus, the optimization problem is simple. 

<center style="font-size: 15pt; font-family: courier; margin-bottom: 1em;">
Given $\mathbb{O}_r$, pick the best paper $p^*$ that maximizes $E[impact|p^*]$   
<br/>
s.t. $\nexists p'\ E[impact|p'] \gg E[impact|p^*]$
</center>


The _Novelty_ constraint says that $p^*$ is better than any alternative $p'$ in related work.  Also, note that the input is $\mathbb{O}_r$ but $E[\circ]$ is defined over $$\mathbb{O}_{p^*}$$)


# Takeaways

There are many takeaways that we can make based studying the above optimization problem.  I group them into "things related to the PhD", and "things in general".

## PhD Takeaways


#### <a name="phdcert"></a>PhD as Certification 

The PhD is not magical.  You should think of it as certifying that you have _sufficient_ knowledge to conduct research. In other words, given a $p$ and $assum$, you can ensure that:

$$\begin{align}
\blue{P(evid | you)} &> threshold\\
\blue{P(p | evid)} &\approx 1
\end{align}$$

An important purpose of taking courses, coding, doing internships, mentorship, reading papers, getting criticism is improving these terms.


#### Ideas, Novelty, Vision 

Assuming you're "certified", researchers primarily differ based on the red part of the model.  This is driven by taste (e.g., what _good_ means to you).    This boils down to the quality of the ideas, and the researcher's vision.


Ideas: identifying great outcomes

* Identifying a great outcome ($o\gg 0$) as well as an approach $p$ that vastly improves on what is possible $\red{P(o \| p) \gg P(o\|p')\ \forall p'}$
* Finding great outcomes is very hard.  The advisor and community should *nurture and encourage* this skill.

Vision: can you anticipate the future?

* $\red{P(assum \| future) \gg P(assum \| now)}$  means you can see that assumptions that currently do not hold will in the future.  For instance, foreseeing technology trends.
* Ability to estimate a large subset of outcomes $\red{\mathbb{O}_{r} \subset \mathbb{O}}$ 


<div style="margin-top: 2em; text-align:center; font-weight: bold; font-size: 15pt;">
Takeaway: Excellent PhD programs/advisors nurture ideas and vision.
</div>


### <a name="applying"></a>Applying for a PhD 

It is clear that one hopes to admit graduate students that have the capacity to work on research that have high $E[impact\|p]$.  Faculty reviewers naturally seek to estimate each of the model terms from the application and interviews.   

The quantifiable ones that are easier to measure are also what the PhD certifies: $\blue{P(p\|evid,assum)P(evid\|you)}$.  If you have done past research or complex projects, they can be used to demonstrate _technical competence_.  This simply means it is more likely that you can learn and complete projects of interest.    This doesn't mean you need to know everything - that's the purpose of taking relevant classes, working on starter research projects, and interning.    If you assume that faculty are risk adverse, they will look for students with more samples, or samples that have high certainty described in recommendation letters.

The intangible components are related to ideas and vision.  This is part of the value of the essay.    It is harder to illustrate this unless you have led projects in the past.  If this is the case, describe the positive outcomes enabled by your work!   Show that you have vision by remarking about ways that could maximize $E[\circ]$. These could be, but are not limited to:

* Assumptions that may change in the future ($P(assum\|future)\gg P(assum\|now)$)
* Outcomes that people are not thinking about ($\mathbb{O}_{r}$)
* Techniques that people are not thinking of that would dramatically boost the ability of other researchers to gather evidence $P(evid\|researchers)$.



### <a name="reviewing"></a>Reviewing and Reading Papers 

You will read and present many papers throughout your PhD.  Eventually you will have the opportunity to review papers.  The two activites overlap a lot, so I'll mainly describe this subsection in terms of paper reviewing.

Reviewing is checking that $E[impact\|p]$ is high enough for the paper, with a correctness constraint.  It's important that published papers satisfy $\blue{P(p\|evid,assum)P(evid)}\approx 1$.  It would be embarassing to you and the community if factually inaccurate papers slip through the cracks.    You are also checking that the assumptions actually hold ($\red{P(assum)} > 0$).  These can take time but are largely "mechanical".


The hard part is evaluating that the paper's ideas _could_ have desirable outcomes above some threshold $\tau$: 

$$\red{\sum_{o\in\mathbb{O}_p} o\times P(o | p)} > \tau$$

The threshold $\tau$ is ill defined, but generally "higher-tier" venues have a higher threshold than lower tier venues.  Since it is ill-defined, a common reason to reject a paper is that the paper lacks "originality" or the "contribution is too small".  This can be because the outcomes $\mathbb{O}_p$ are not clearly spelled out, or the connection between the paper's ideas and the outcomes are unclear ($P(o\|p) = ?$)

This is where it's important to stop yourself from viewing the submission from an adversarial perspective!  If you could imagine positive outcomes that fall out from the paper, _even if the authors missed them_, then the paper could be worth accepting!  Recall from above that ideas are to be nutured by the PhD process _and the research community_.

#### <a name="threepapers"></a>3 Types of Papers 

Since the ultimate goal is to identify papers that could maximize $E[impact\|p]$, let's look at how that affects different types of papers.  I'll base this on topics I am aquainted with:


<strong>Improving a well established problem</strong>, and why the experimental bar is higher:

{:.example}
Consider a paper $p$ that proposes a system design for a super fast key-value system.  The value of a faster system is well established, meaning there is an agreed upon set of outcomes $\mathbb{O}_{kvstore}$ such that $$\mathbb{O}_p \approx \mathbb{O}_{kvstore}$$.  It is also clear the types of evidence (xacts per second, concurrency, etc)  needed to illustrate the paper's claims, meaning $P(p \| evid,assum)$ is more or less fixed.   Thus the main items to scrutinize are the techniques to establish evidence $P(evid\|you)$, the system assumptions $P(assum)$, and whether not the techniques could lead to better designs in other systems
($$\mathbb{O}_{kvstore}\subset \mathbb{O}_{p}$$).
Since most terms are fixed, it naturally leads to emphasis on system design, assumptions, and evaluation.

<strong>The Vision(ary) paper</strong> highlights a set of outcomes so different from the rest of the research community that it's worth getting the word out because there's potential to increase $E[impact]$ of the whole community. 

{:.example}
By 2011, Mechanical Turk (MTurk) had been around for about 6 years, often for labeling and data cleaning/collection tasks, and was getting attention from HCI communities.  [Adam Marcus](http://www.marcua.net) suggested that MTurk was at a price point where workers could be though of as databases themselves.  Despite lots of work on thinking of sensors, the web, remote machines, files as databases, thinking through the implications of fleshy, human databases was pretty exciting and we wrote a ["vision paper"](http://sirrice.github.io/files/papers/qurk-cidr11.pdf) around the idea.   It sketched an architecture and slapped together a language ($P(evid\|r)$ was mediocre), made hand-wavy assumptions (low $P(assum)$), and focused on the potential of great outcomes (high $\mathbb{O}_p$).

<strong>The "Perfect" paper</strong> scores high on every term in our model.  These tend to win "test of time" awards later on, because most people can't predict how $\mathbb{O}_p$ will actually play out.

{:.example}
Provenance is the idea of tracking the input records/objects that contributed to a result.  There were many definitions of what "contribute" means, and different ways of modeling provenance.  The [Provenance Semirings](https://www.google.com/search?q=provenance+semirings) paper introduced the notion of representing the provenance of an output record $y$ as semiring polynomials over input records. Basically, $y=x_1 + 2x_2$ means that $x_1$ and two copies of $x_2$ were used to derive the output $y$.   They showed correctness for an important subset of SQL, and showed existing notions of "contribution" were special cases.  It also presented a universe of mathematical tools to think about provenance, and immediately impacted any application that relies on provenance (e.g., auditing, derivation tracking, incremental view deletion).  
<br/>
Since the paper proved correctness, $P(evid\|you)P(p\|evid,assum) = 1$.  The assumptions were simply that you cared about provenance.   There was already a set of important applications for which $P(o\|p)=1$, at the time it felt like $$\mathbb{O}_p$$ could be very large, and $$\mathbb{O}_p$$ grows over time as we discover new connections.  _In effect, every term in our model was high_  




#### <a name="lpu"></a>Least Publishable Units 

There is a subclass of paper widely considered as [Least Publishable](./files/lpu.pdf) [Units](https://en.m.wikipedia.org/wiki/Least_publishable_unit)  (LPUs).  These are technically correct, technically correct, but not really meaningful.  You can verify if any combination of the following hold:

* $\red{P(assum)} \approx 0$ meaning the problem is made up.
* $\red{P(o \| p)} \le 0$ for $o\in \mathbb{O}_p$  meaning it doesn't have a lot of positive outcomes.
* $\blue{P(evid)}\approx 1$  meaning the evidence is blindingly obvious.

{:.example}
My first "solo" author paper arguably has elements of an LPU.  [Shinobi](http://sirrice.github.io/files/papers/shinobi-icde11.pdf) was a database data-layout optimization tool.  The idea is that indexes are useful for reading small amounts of data, but can slow down insert operations since the indexes need to be updated.  Instead, it would partition the data in the table and dynamically add indexes for read-heavy partitions, and drop indexes if partitions became insert heavy.  However, it only worked for geo-spatial data (e.g., checkins, car locations) and if access patterns were very predictable.  Even though it beat baselines, it was kind of slow in absolute terms.  In otherwords, $P(assum)$ was low, the improvements were not ground breaking ($$\sum_{o\in\mathbb{O}_p} o$$ was low), and the results were not entirely surprising ($P(evid)$ was high).
<br/><br/>
HOWEVER! It was important to write the paper as a training exercise for problem selection and developing skills so that $P(evid\|me)\approx 1$ in the future.















## General Comments 

In this section, we interpret many aspects of research in terms of maximizing $E[impact\|p]$.  We assume that you have a PhD certificate, meaning $\blue{P(evid\|you) \times P(p\|evid,assum)} \approx 1$.

### <a name="communication"></a>Communication 

There is a commonly held ideal to "let the work speak for itself", meaning that good work will be recognized and appreciated.  It implicitly discourages communication if the measure of impact is fame.    But what if we care about impact in terms of changing society, policy, lives, or even other researchers' habits and tools.  Consider an outcome $o$ for paper $p$, then $P(o\|p)$ ignores important latent variables!  Let's consider one instance.

Papers are a manifestation of an idea that can contribute to another researcher $r$'s research impact.  Let the outcome be the probability that $r$ adopts the paper's ideas in an impactful way, meaning that we want the following to be high:

$$P(impact | r) P(r\ understands\ p|r\ reads\ p) P(r\ reads\ p)$$
 
We cannot really control the first term directly, but the other two terms are important:

1. $P(r\ reads\ p)$.  $r$ must be aware of the work!  With [arXiV](https://arxiv.org/) and larger and larger conferences, it is difficult for any researcher to read everything.  Thus, $r$ must be _convinced to read_ $p$.  Let's call this marketing, explored below.  
2. $P(r\ understands\ p)$.    $r$ has been convinced to read your paper!  Will it be easy for her to figure out what your paper is saying?  This is about writing clearly, thoroughly, and unambiguously, so that $r$ can take your ideas and techniques and actually use them.  This is also why examples are important to illustrate applications of your techniques/ideas.


#### <a name="marketing"></a>Marketing 

Let's look into $P(r\ reads\ p)$ a bit, since marketing can be a slightly sensitive issue.  We can break it into two terms:

$$P(r\ reads\ p) = P(aware\ of\ p) P(buys\ p's\ ideas)$$

* $P(aware\ of\ p)$ can be called "Amount of Marketing".  This includes giving talks, writing blog posts, making tweets, posting videos, talking to journalists.
* $P(buys\ p's\ ideas)$ can be called "Quality of Marketing".  This is whether or not the quality of the marketing is good enough that prospective researcher $r$ considers it worthwhile.  In general, this term should be $\approx 1$.   This is why it can easily take a month or more to create a conference talk.

Viewing "marketing" through an optimization lens helps us think about two common types of sub-optimal strategies (since $P(buys\ p's\ ideas)\approx1$):  

1. $P(aware\ of\ p)\gg P(impact \| r)$  Overmarketing is when the amount of awareness is not consummerate with the expected impact of the work on others.  
2. $P(aware\ of\ p)\ll P(impact \| r)$ Arguably a more wide-spread issue is _undermarketing_, where work that could have lots of impact is not marketing enough for people to know about it.   

Both are suboptimal because it distracts from other impactful work (the first case), or deprives others from doing impactful work (the second case).  I consider the second case a bigger issue because it is more widespread and requires training.  

Why are papers undermarketed?  My hypothesis is that $P(impact\| p)$ is difficult to measure, and the authors are overly conservative in their estimates.  Meaning that the author's perception of their own work is lower than what it actually is.   Hopefully sampling from positive colleagues is a good way of compensating for this bias.  



### <a name="whyresearch"></a>Why Research? 

Presumably, you are in a research program because you believe _doing research_ is the best way to maximize this probability:

$$E[impact | you] = E[impact | your\ research] + E[impact | non\ research\ stuff]$$

Clearly there is a strong assumption of the following, based on your subset of desired outcomes $\mathbb{O}_r$.

$$E[impact | your\ research] \gg E[impact | non\ research\ stuff]$$


For some people, it turns out this assumption is not true, and it is better to leave research and do _real work_. This is primarly because $E[impact \| non\ research\ stuff] \gg E[impact \| your\ research]$.  For instance, it can be joining a non-profit, finding an arbitrage opportunity, social entrepreneurship, teaching, etc.  All of these are totally totally cool.

Some may try to suggest that you're not "cut out" for research, implying that $P(evid \| you) \rightarrow 0$.  Hopefully at this point you would agree that it's a narrow (sic. stupid) measure.  Don't listen to them.



### <a name="badoutcomes"></a>Unintended Outcomes 

Since the goal is to have a positive impact on the world, it is not acceptable to simply state that one is "developing technology for technology's sake".    This is equivalent to focusing only on $P(p \| you)$ or only positive outcomes.  Let $\mathbb{O}^{+}_p$ and $\mathbb{O}^{-}_p$ are good and bad outcomes of the paper.  We want to make sure that:

$$E[impact | p] = P(p) \left(\sum_{o\in\mathbb{O}^{+}_p} o\times P(o|p) - \sum_{o\in\mathbb{O}^{-}_p} o\times P(o|p) \right) \gg 0 $$


Ignoring $\mathbb{O}^{-}_p$ can lead to a crisis of conscience when the negative outcomes become widespread.  This is increasingly [important as tech integrates closer into our lives and society](http://www.argmin.net/2017/12/21/ascent-directions/).   This is not unique to researchers.  Recently, [facebook execs expressed their regret in eroding democracy](https://www.youtube.com/watch?v=PMotykw0SIk), while articles about silicon valley [make similar statements](https://www.buzzfeed.com/tedchiang/the-real-danger-to-civilization-isnt-ai-its-runaway?utm_term=.rmkMVmpNK#.mqWWv7ald).

The following is one that's personally scary to me:

{:.example}
The recent research in [automatically generating lipsynced videos](https://www.youtube.com/watch?v=9Yq67CjDqvw) is arguably a technology that can have deeply negative consequences.  One reason is that it makes it so easy to generate realistic-seeming videos that it fundamentally sheds doubt on what evidence can be believed.  The amount of doctored videos can be generated at a higher rate than people can discern and verify them, and encourage people to simply give up and not trust any evidence.



### <a name="assprof"></a>The Assistant Professorship 

Above, I asserted that a PhD is a certificate suggesting that $P(p\|evid,assum) P(evid\|you) \approx 1$, meaning that you are able to execute on a research problem correctly, and can hopefully mentor others to do the same.   Using the model, a narrow way to view the assistant professorship is a selection process that gives you time to show that you can select a set of papers $\mathbb{P}$ to publish such that it is above some threshold $\tau$ decided by your letter writers:

$$\sum_{p \in \mathbb{P}} E[impact | p] > \tau$$


### <a name="thecrowd"></a>Following the Crowd 

Following the crowd means that $P(assum\| now) \approx 1$.  If this is the case, it usually means that many researchers are all aware of the problems to solve.  In other words,  $\mathbb{O}_{r'} \approx \mathbb{O}_r$ for two researchers $r$ and $r'$.  

In this setting, one hopes that $P(evid \| you) \gg P(evid \| r')$ so that you can out-execute others.


### <a name="hammer"></a>Hammers Without Nails 

It is easy to develop systems or techniques by focusing on getting $P(p\|evid,assum)P(evid\|you) \approx 1$ (the Hammer).  This assumes that the hammer is indeed useful ($\mathbb{O}_p \ne \emptyset$).  However, since you're on the hook looking for positive outcomes (the Nails), it runs the risk of coming up empty handed:

$$\mathbb{O}_r \cap \mathbb{O}_p \approx \emptyset$$


<!--
**Imposter syndrome**

[Imposter syndrome](https://en.m.wikipedia.org/wiki/Impostor_syndrome) is a concept describing individuals who are marked by an inability to internalize their accomplishments and a persistent fear of being exposed as a "fraud".  One perspective on this is that there is an incorrect implication that

$$P(p|you)$$
-->

### <a name="perfection"></a>Perfection is the Enemy of Progress 

It is often tempting to focus on building the perfect system, getting all possible results, fixing all the bugs, or otherwise writing the perfect paper.  This is equivalent to focusing on $P(evid\|you) = 1$.  Based on the model, it is clear that doing so has decreasing marginal benefit unless $P(assum)$ and $P(o\|p)$ are so high that $E[impact\|p]$ will actually increase.

Learn more on the [wikipedia page](https://en.m.wikipedia.org/wiki/Perfect_is_the_enemy_of_good)

### <a name="hardprobs"></a>Hard Problems vs Simple Problems 


Grad students often worry about not working on "hard problems" because solving hard problems is viewed as a badge of honor, and shows that you're [smart](https://www.youtube.com/watch?v=tcGQpjCztgA).  A hard problem is a paper where $P(evid\|r)\approx 0$ for nearly all researchers $r$.  Solving it supposedly implies that you can solve other hard problems.

Hopefully by this point, it is obvious why problem hardness does not necessarily imply impact (unless the desired outcome is to appear smart).  It ignores whether or not the problem even matters for good outcomes, $P(o\|p)$, whether or not it is practical $P(assum)$, and how many good outcomes it affects $\|\mathbb{O}_p\|$.  This is why working on simple problems is totally fine, if it is carefully selected to maximize $E[impact\|p]$.


### <a name="industry"></a>Academia vs Industry 

Finally, a comment about doing research in academia vs industry.  Arguably, industry has way more resources than academics, so academics should be selective about the class of papers $p$ to work on.  In other words, we can assume that for the most part, $P(evid\|industry)\gg P(evid\|you)$, however industry has pressure to show short-term results.  Thus, the ideal class of problems are ones where $P(assum \| now) \approx 0$ and $P(assum\|future) \approx 1$.  Here's a made up diagram:

<img src="./files/images/researchmodel.png" width="300px"/>


