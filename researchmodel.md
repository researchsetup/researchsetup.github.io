---
layout: post
tagline:
---

# Bayesian Model of Research and the PhD

Grad school and research is a complicated process.  It can be ovewhelming because it's not clear what being a good research means, and what it means to do _good work_.  There is also a lot of advice floating around -- how can one systematically reason about the process?  What's the point?  

This document proposes _a_ model to reason about the role of papers (as a unit of research) in the bigger context, and uses the model as a framing device for many common comments about research and ideas.

#### Caveats

Keep in mind that I am primarily acquainted with computer science, and specifically data management and visualization.  I know just enough modeling to understand that 

 $$\begin{align}
   P(happy) &= P(happy | cat) + P(happy | no cat)\\
          1 &= P(happy) + P(not happy)\end{align}$$


## <a name="themodel"></a> TLDR;

Here, we assume a paper as the unit of research and build a simple model of the expected positive impact $E[Impact\|p]$ of a paper $p$.   See [the appendix below](#appendix) for background and context of the model.

Consider all possible outcomes $\mathbb{O}$, where $o\in\mathbb{O}$ is _some_ goodness value for a possible future $o$.  For example, $o$ could be a product, and goodness could be amount of money you make, social equality, happiness, whatever you want.   We could add up all possible outcomes weighed by how probable they are if the paper is written:

$$E[Impact | p] =  P(p) \sum_{o \in \mathbb{O}} o\times P(o | p)$$

As a researcher, you want to pick the best paper $p^\*$ that maximizes $E[Impact\|p^*]$.  

Here, $P(p)$ is the probability that the paper's claims actually hold.   This hinges on  your ability to collect evidence $evid$ to support the claims and the paper's assumptions $assum$ being true:  

$$P(p) = P(p | evid, assum) P(evid | you) P(assum)$$

To summarize, the impact of a paper is:

$$\definecolor{blue}{RGB}{18,110,213}
\newcommand{\red}[1]{\textcolor{red}{#1}}
\newcommand{\blue}[1]{\textcolor{blue}{#1}}
$$

$$E[Impact | p] = 
\blue{P(p | evid, assump) P(evid | you)} 
\red{P(assump)}
\red{\sum_{o \in \mathbb{O}} o\times P(o | p)}
$$




**Correctness: is the paper believable?**

$\blue{P(p \| evid, assump)}$ defines whether the evidence is good enough to prove the claim.  This is called experimental design and it should be 1.

$\blue{P(evid \| you)}$ is called _conducting research_ and should be close to 1.  

**Impact: does the paper matter?**

$\red{P(assump)}$ defines the scope of the applicability.  Understanding the market, trends, talking to practitioners increases the probability of picking a problem where the assumptions hold.

$\red{o\times P(o \| p)}$ defines the belief about whether or not the outcome $\red{o}$ is meaningful and how much the paper will increase its likelihood $\red{P(o \| p)}$.   




## Main Takeaways


The PhD, at minimum, is a certification that

* $P(evid \| you) > threshold$ and $P(p \| evid) \approx 1$
* Taking courses, coding, reading papers, getting criticism are all for this

Since we expect $P(p\|evid,assum)P(evid\|you)\approx 1$, when researchers primarily differ based on the red part of the model.  This is driven by taste (e.g., what _good_ means to you).    This boils down to the quality of the ideas, and the researcher's vision.


Ideas

* Identifying an idea where $P(o \| p) \approx 1$ is very very hard thus this *must be nurtured and encouraged.* 
* Accept that _good_ can have many definitions.  Some argue that a liberal arts degree helps pick meaningful definitions of _good_. 

Vision 

* Having vision can take several forms
	* $P(assum \| future) \gg P(assum \| now)$  means you can see that assumptions that currently do not hold will in the future.  For instance, foreseeing technology trends.
  * ability to estimate a large subset of $goodoutcomes$ 


<div style="text-align:center; font-weight: bold; font-size: 15pt;">
Takeaway: Excellent PhD programs/advisors  nurture ideas and vision.
</div>


## Further Takeaways

In this section, we interpret many aspects of research in terms of maximizing $E[Impact\|p]$.

### Communication

There is a commonly held ideal to "let the work speak for itself", meaning that good work will be recognized and appreciated.   That is true if the goodness measure is fame.  It is not true if the definition is change in society, policy, lives, or even other researchers' habits and tools.  Consider an outcome $o$ for paper $p$, then $P(o\|p)$ ignores important latent variables!  Let's consider a few.

Papers are a manifestation of an idea that can contribute to another researcher $r$'s approach towards research.  Let the outcome be that $r$ adopts the paper's ideas in a productive way, meaning that we want the following to be high:

$$P(Impact | r) P(r\ understands\ p|r\ reads\ p) P(r\ reads\ p)$$
 
We cannot really control the first term directly, but the other two terms are important:

1. $P(r\ reads\ p)$.  $r$ must be aware of the work!  With [arXiV](https://arxiv.org/) and larger and larger conferences, it is difficult for any researcher to read everything.  Thus, $r$ must be _convinced to read_ $p$.  Let's call this marketing, explored below.  
2. $P(r\ understands\ p)$.    $r$ has been convinced to read your paper!  Will it be easy for her to figure out what your paper is saying?  This is about writing clearly, thoroughly, and unambiguously, so that $r$ can take your ideas and techniques and actually use them.  This is also why examples are important to illustrate applications of your techniques/ideas.


#### Marketing

Let's look into $P(r\ reads\ p)$ a bit, since marketing can be a slightly sensitive issue.  We can break it into two terms:

$$P(r\ reads\ p) = P(aware\ of\ p) P(buys\ p's\ ideas)$$

* $P(aware\ of\ p)$ can be called "Amount of Marketing".  This includes giving talks, writing blog posts, making tweets, posting videos, talking to journalists.
* $P(buys\ p's\ ideas)$ can be called "Quality of Marketing".  This is whether or not the quality of the marketing is good enough that prospective researcher $r$ considers it worthwhile.  In general, this term should be $\approx 1$.   This is why it can easily take a month or more to create a conference talk.

Viewing "marketing" through an optimization lens helps us think about two common types of sub-optimal strategies (since $P(buys\ p's\ ideas)\approx1$):  

1. $P(aware\ of\ p)\gg P(Impact \| r)$  Overmarketing is when the amount of awareness is not consummerate with the expected impact of the work on others.  
2. $P(aware\ of\ p)\ll P(Impact \| r)$ Arguably a more wide-spread issue is _undermarketing_, where work that could have lots of impact is not marketing enough for people to know about it.   

Both are suboptimal because it distracts from other impactful work (the first case), or deprives others from doing impactful work (the second case).  I consider the second case a bigger issue because it is more widespread and requires training.  

Why are papers undermarketed?  My hypothesis is that $P(Impact\| p)$ is difficult to measure, and the authors are overly conservative in their estimates.  Meaning that the author's perception of their own work is lower than what it actually is.   Hopefully sampling from positive colleagues is a good way of compensating for this bias.  

### Partial Information

Clearly, we don't have access to all possible outcomes $\mathbb{O}$.  Instead, each researcher $r$ imagines a small subset $\mathbb{O}_r \subseteq \mathbb{O} $ of possible outcomes.  Hopefully, the imagined outcomes are positive: 
$$\sum_{o \in \mathbb{O}_r} o \gg 0$$
The optimization for selecting what research to pursue is based on the researcher's $\mathbb{O}_r$, which is colored by experiences, education, etc, and contributes to what people call "vision".

### Unintended Outcomes

Since the goal is to have a positive impact on the world, it is not acceptable to simply state that one is "developing technology for technology's sake".    This is equivalent to focusing only on $P(p \| you)$ or positive outcomes.  It's generally a good idea to make sure of the following, assuming $\mathbb{O}^{+}$ and $\mathbb{O}^{-}$ are good and bad outcomes:

$$E[Impact | p] = P(p) \left(\sum_{o\in\mathbb{O}^{+}} o\times P(o|p) - \sum_{o\in\mathbb{O}^{-}} o\times P(o|p) \right) \gg 0 $$


Ignoring $\mathbb{O}_{-}$ often leads to a crisis of conscience.   This is not at all unique to researchers.  There are [many examples](https://www.youtube.com/watch?v=PMotykw0SIk).



### Least Publishable Units

Least publishable units (LPUs) are papers that are technically correct, and shows something new but not really meaningful.  These are papers for which any combination of the following hold:

* $P(assump) \approx 0$ 
* $P(o \| p) \le 0$ for $o\in \mathbb{O}_r$


### Assistant Professorship

Above, I asserted that a PhD is a certificate suggesting that $P(p\|evid,assum) P(evid\|you) \approx 1$, meaning that you are able to execute on a research problem correctly.   In this vein,the assistant professorship selects for, and gives you time to show that you can select a set of papers $\mathbb{P}$ to publish such that it is above some community decided threshold $\tau$:

$$\sum_{p \in \mathbb{P}} E[Impact | p] > \tau$$


### Following the Crowd

Following the crowd means that $P(assum\| now) \approx 1$.  If this is the case, it usually means that many researchers are all aware of the problems to solve.  In otherwords,  $\mathbb{O}_{r'} \approx \mathbb{O}_r$ for two researchers $r$ and $r'$.  

In this setting, one hopes that $P(evid \| you) \gg P(evid \| r')$ so that you can out-execute others.



<!--
**Imposter syndrome**

[Imposter syndrome](https://en.m.wikipedia.org/wiki/Impostor_syndrome) is a concept describing individuals who are marked by an inability to internalize their accomplishments and a persistent fear of being exposed as a "fraud".  One perspective on this is that there is an incorrect implication that

$$P(p|you)$$
-->

### Perfection is the enemy of progress

It is often tempting to focus on building the perfect system, getting all possible results, fixing all the bugs, or otherwise writing the perfect paper.  This is equivalent to focusing on $P(evid\|you) = 1$.  Based on the model, it is clear that doing so has decreasing marginal benefit unless $P(assum)$ and $P(o\|p)$ are so high that $E[Impact\|p]$ will actually increase.


### Hard problems vs Simple problems


Grad students often worry about not working on "hard problems" because solving hard problems is viewed as a badge of honor.  A hard problem is a paper where $P(evid\|r)\approx 0$ for nearly all researchers $r$.  Solving it somewhat implies that you can solve other hard problems.

Hopefully by this point, it is obvious why problem hardness does not necessarily imply impact.  It ignores whether or not the problem even matters, $P(o\|p)$, and whether or not it is practical $P(assum)$.  This is why working on simple problems is totally fine, if it is carefully selected to maximize $E[Impact\|p]$.

### Why Academia?

Presumably, you are in a research program because you believe _doing research_ is the best way to maximize this probability:

$$E[Impact | you] = E[Impact | your\ research] + E[Impact | non\ research\ stuff]$$

Clearly there is a strong assumption of the following, based on your subset of desired outcomes $\mathbb{O}_r$.

$$E[Impact | your\ research] \gg E[Impact | non\ research\ stuff]$$


For some people, it turns out this assumption is not true, and it is better to leave research and do _real work_. This is primarly because $E[Impact \| non\ research\ stuff] \gg E[Impact \| your\ research]$.  For instance, it can be joining a non-profit, finding an arbitrage opportunity, social entrepreneurship, teaching, etc.  All of these are totally totally cool.

Some may try to suggest that you're not "cut out" for research, implying that $P(evid \| you) \rightarrow 0$.  Hopefully at this point you would agree that it's a narrow (sic. stupid) measure.  Don't listen to them.



### Academia vs Industry

Finally, a comment about doing research in academia vs industry.  Arguably, industry has way more resources than academics, so academics should be selective about the class of papers $p$ to work on.  In other words, we can assume that for the most part, $P(evid\|industry)\gg P(evid\|you)$, however industry has pressure to show short-term results.  Thus, the ideal class of problems are ones where $P(assum \| now) \approx 0$ and $P(assum\|future) \approx 1$.  Here's a made up diagram:

<img src="./files/images/researchmodel.png" width="300px"/>


<!--

## Appendix

This section sets up the context of the model.  The good stuff [was in The Model](#themodel)

Let us start by agreeing that the broad goal is to maximize the probability of some goodness measure in the world.  

        P(good)

This could be really anything and is a personal decision.  It could be:


        P(love)   
        P(not world hunger)   
        P(health)   
        P(wealth)

This is too general, so let us decompose it into elements under your control and in the context of research.  First, the focus is on `you`:

        P(good | you)

For the purposes here, you have chosen research, so let us assume `P(nonresearch | you) -> 0`:

        P(good | you) = P(good | research) P(research | you)

Let us take _the paper_ as proxy for a unit of research.  That is clearly a vast oversimplification, but let us go with that for now — you are a paper generator.  You could generate *sound* papers, or *unsound and incorrect* papers.

        P(good | you) = P(good | paper) P(paper | you) = 
                        P(good | sound) P(sound | you) + P(good | unsound) P(unsound | you)

We generally assume that sound technical work is better.  In other words, that 

       P(good | unsound) -> 0.  

This is pretty reasonable, however one might say that `P(fame | unsound)` is a different story, because `P(unsound | you)` is arguably easier.  We also hope that in the long term, aspects such as shame get in the way of fame.  To simplify our life, let us strive for sound work:

       paper = sound paper

We are now set up to get to business and analyze the positive impact of publishing sound research.  


-->
