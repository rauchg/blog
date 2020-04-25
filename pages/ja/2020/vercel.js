import Post from "../../../components/layouts/post";
import P from "../../../components/post/paragraph";
import HR from "../../../components/post/hr";
import Header from "../../../components/post/header";
import { H2, H3 } from "../../../components/post/heading";
import withViews from "../../../lib/with-views";
import Head from "next/head";
import Link from "next/link";
import { PostHrefLang } from "../../2020/vercel";

export default withViews(({ views }) => (
  <Post>
    <Header title="Vercel (日本語訳)" date="April 21, 2020" views={views} />
    <Head>
      <meta property="og:title" content="Vercel (日本語訳)" />
      <meta property="og:site_name" content="Guillermo Rauchのブログ" />
      <meta
        property="og:description"
        content="「Vercel」という名と共に、私達の物語は続きます"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta property="og:image" content="https://rauchg.com/og/vercel.png" />
    </Head>
    <PostHrefLang />
    <P>
      訳註:{" "}
      <a href="https://nextjs.org/" target="_blank">
        Next.js
      </a>
      の生みの親の一人で、
      <a href="https://vercel.com/" target="_blank">
        Vercel
      </a>
      社のCEOを務める
      <a href="https://twitter.com/rauchg" target="_blank">
        @rauchg
      </a>
      による記事の翻訳です。原文は
      <Link href="/2020/vercel">
        <a>こちら</a>
      </Link>
      。訳者はVercelのエンジニアであり、ハンス・ロスリングほか著『FACTFULNESS』の共訳者でもある上杉周作(
      <a href="https://twitter.com/chibicode" target="_blank">
        @chibicode
      </a>
      )。ちなみに、Vercel社はこのたび社名をZEITから改名しました。
      <a href="https://vercel.com/blog/zeit-is-now-vercel" target="_blank">
        公式発表はこちら
      </a>
      。
    </P>
    <HR />
    <P>
      本日、私達は社名を
      <a href="https://vercel.com" target="_blank">
        <b>Vercel</b>
      </a>
      に改め、2100万ドルの資金調達を実施したことを公表しました。資金調達においては、錚々たる顔ぶれのVC(
      <a href="https://www.accel.com" target="_blank">
        Accel
      </a>
      、
      <a href="https://crv.com" target="_blank">
        CRV
      </a>
      )や個人投資家の方々(
      <a href="https://twitter.com/jordwalke" target="_blank">
        Jordan Walke
      </a>
      、
      <a href="https://twitter.com/natfriedman" target="_blank">
        Nat Friedman
      </a>
      、
      <a href="https://twitter.com/floydophone" target="_blank">
        Pete Hunt
      </a>
      、
      <a href="https://twitter.com/jessfraz" target="_blank">
        Jessie Frazelle
      </a>
      、
      <a href="https://twitter.com/soleio" target="_blank">
        Soleio
      </a>
      、
      <a href="https://twitter.com/naval" target="_blank">
        Naval Ravikant
      </a>
      、その他多くの皆様)からご支援を頂いています。
    </P>
    <P>
      せっかくの機会なので、今回はVercelのビジョンについて語らせてください。私達は、Jamstackのウェブサイトを作り・試し・公開する仕組みの質を極限まで追求し、ゆくゆくは
      <b>フロントエンド開発の体験</b>
      を再定義したいと考えています。
    </P>
    <P>
      最近の大きな流れとして、クラウドインフラ、Kubernetes、様々なAPIを提供するサービス等の台頭により、バックエンド開発にコモディティ化の波が押し寄せました。その結果、やりがいがある革新の機会がまだどれだけ残っているか？という点において、フロントエンド開発がより魅力的になりつつあります。そしてフロントエンド開発こそが、多くの企業において価値の源泉であると言えるでしょう。集客や収益化に繋がるコンテンツやプロダクトに、フロントエンドは直結しているからです。
    </P>
    <P>
      また近年、Jamstack(JavaScript・API・マークアップ)という設計手法が登場し、フロントエンドとバックエンドを切り分けることが容易になりました。これにより、バックエンドが足枷になることなく、フロントエンドを今まで以上に効率よく作ることができます。Jamstackへの移行に関してはグーグル、フェイスブック、マイクロソフトが太鼓判を押しており(
      <a
        target="_blank"
        href="https://www.youtube.com/watch?v=EpYYe6aQjJM&feature=youtu.be"
      >
        例: マイクロソフトのドキュメンテーションサイトは全てJamstackで構築
      </a>
      )、業界全体において日進月歩で導入が進んでいます。
    </P>
    <P>
      Accel(訳註: 今回Vercelに投資したVC)の
      <a href="https://twitter.com/daniel_levine" target="_blank">
        Daniel Levine
      </a>
      は、「デザイナーやフロントエンドエンジニアが、主導権を握ってUIやUXを作り込むことができるか否か。これこそが、将来ほとんどの大規模市場において、ビジネスの勝敗を決める鍵となるだろう」と予想しています。また彼は、「Vercelは、
      <em>
        <b>フロントエンド版のAWS</b>
      </em>
      になれるかもしれない」とも話していました。
    </P>
    <H2 id="megatrends">フロントエンドの開発者体験を左右する3大トレンド</H2>
    <P>
      Jamstackの台頭に加え、フロントエンド開発は全般的に近代化が進んでいます。
      開発を高速化するツールが現れてJavaScriptエンジニアが恩恵を受けたり、サービス自体が最新技術によって高速化されることでユーザーが恩恵を受けています。このように近代化が進む中で、さらに良質なフロントエンドの開発者体験を追求するためにはどうすればいいか。おそらく、以下に述べる3大トレンドに留意する必要があるでしょう。
      ちなみに、Vercelが提供するフロントエンド開発者向けのクラウドプラットフォームは、これらのトレンドを念頭に置いて設計されています。
    </P>
    <H3 id="develop-with-components">1. コンポーネント化が最適解</H3>
    <P>
      より高度なUIやUXが求められるにつれ、現場ではコンポーネント化やデザインシステムの導入が急務になっています。同じプロダクトならば、プラットフォームが違えどユーザー体験に一貫性があるべきです。たとえばボタンの見た目は、ウェブアプリ、モバイルアプリ、デスクトップアプリ、あるいはアプリから送られるメールの文中においても同じであることが望ましいでしょう。
    </P>
    <P>
      少し前まで、コンポーネント化は常識ではありませんでした。セレクタエンジンやDOMが話題の中心だったのです。そんな中、フェイスブックが生み出したReactがコンポーネント化の概念を提唱しました。もちろん、他のフレームワークでもコンポーネントを定義することはできましたが、コンポーネント化の流れを作った先駆者は紛れもなくReactでした。
    </P>
    <P>
      数年前、
      <a href="https://twitter.com/timneutkens" target="_blank">
        Tim Neutkens
      </a>
      、
      <a href="https://twitter.com/nkzawa" target="_blank">
        Naoyuki Kanezawa
      </a>
      、そして私の3人は、「Reactはすごい。いずれ、フロントエンドは全てReactで書けるようになるだろう」と感じ、それを実現するためにNext.jsを作りました。一つのコンポーネントだけにReactを使うのではなく、
      <b>何もかも</b>
      をReactで書きたい人向けに必要な機能を実装したのです。Next.jsは、Reactが切り拓いたコンポーネント化の考え方を、フロントエンド全てに応用したいというニーズに応えました。
    </P>
    <P>
      私達の読みは的中しました。現在、フロントエンド開発現場の多くはコンポーネント化への移行を急ピッチで進めています。多くはReactを選び、フロントエンドをバックエンドから分離し、設計を抜本的に見直そうとしているのです。Vercelは、そういった課題に直面しているフロントエンド開発者にとって、必要なものがすべて備うプラットフォームでありたいと考えています。
    </P>
    <P>
      Vercelは
      <a href="https://nextjs.org" target="_blank">
        Next.js
      </a>
      に加え、
      <a href="https://vuejs.org/" target="_blank">
        どんな
      </a>
      <a href="https://nuxtjs.org" target="_blank">
        コンポーネント化の
      </a>
      <a href="https://svelte.dev/" target="_blank">
        フレームワークにでも
      </a>
      <a href="https://glimmerjs.com/" target="_blank">
        満遍なく
      </a>
      <a href="https://angular.io/" target="_blank">
        対応しています
      </a>
      。最近は有力なフレームワークも多く、たとえば
      <a href="https://vuejs.org" target="_blank">
        Vue
      </a>
      や
      <a href="https://svelte.dev" target="_blank">
        Svelte
      </a>
      は、ブラウザが読み込むJavaScriptの容量を大幅に減らすなど意欲的な試みを行っています。どのフレームワークも、コンポーネント化で直面する様々な問題や、
      <a target="_blank" href="https://www.webcomponents.org/">
        コンポーネント化のウェブ標準
      </a>
      における課題を解決することで頭角を現しています。Vercelは、こういったフレームワーク全てを歓迎するプラットフォームでありたいのです。
    </P>
    <H3 id="preview">
      2. コードレビューはデプロイプレビューに如かず。URLは共同作業のためにある
    </H3>
    <P>
      コードをプッシュしてレビューする一連のプロセスは複雑化しがちです。自前のCI/CDパイプラインを構築したり、Jenkinsの設定を弄ったり、CI/CDやCDNのベンダーを選定するのに時間がかかりすぎるのです。CI/CDとCDNをうまく連携させたり、複雑なシステムの挙動を見張るのはとても難儀です。
    </P>
    <P>
      フロントエンドに特化したプッシュ・レビューの仕組みについて試行錯誤した結果、私達は画期的なアイデアにたどり着きました。Jamstackのフロントエンドアプリを開発しているチームにとっては、プレビュー用のURLほどシンプルで強力なものはないと気づいたのです。Vercelを使えば、開発中のフロントエンドアプリをプレビュー用にデプロイし、すぐさまそのURLを取得して結果を確認することができます。コンテンツ管理システム(訳註:
      Wordpressなど)によくあるプレビュー機能と同じですが、Vercelは
      <a href="https://vercel.com/github" target="_blank">
        <b>Gitと連携し、全てのpushに対してデプロイを行うのがポイントです</b>。
      </a>
      (訳註:
      各pushごとに独立したデプロイが行われ、毎度新しいURLが生成されます。また、ブランチに対応したURLも別に生成されます。)
    </P>
    <P>
      たかがURLだと侮るなかれ。プレビューURLには、複雑な仕組みからフロントエンド開発者を解放し、開発スピードを飛躍的に高める効果があるのです。
    </P>
    <P>
      最もわかりやすい例を挙げると、プレビューURLがあれば、開発部門だけでなく、マーケティングや営業や法務など他部門との共同作業が捗ります。社内チャットでプレビューURLを送り合うだけで、いま何の開発が進んでいて、会社としてどの分野に力を入れているのかが可視化されるのです。
    </P>
    <P>
      デプロイ毎に新しくURLが生成されれば、テストも容易になります。プレビューURLを使えば、ステージング環境を通り越して、本番と同じ環境でテストを行うことができます。もちろん、プレビューURLはアイデア段階のプロダクトを試すのにも使えるでしょう。発案から品質保証まで、ソフトウェア開発プロセスの全段階においてプレビューURLは役立つのです。
    </P>
    <P>
      VercelのデプロイプレビューURLのもうひとつのメリットは、すべての機能が本番環境と遜色ないということです。たとえば、Vercelはプレビューを含む全てのデプロイURLを自動で常時SSL化してくれます。インフラ整備に頭を悩ますことなく、
      <a href="https://letsencrypt.org/" target="_blank">
        Let’s Encrypt
      </a>
      を用いたセキュアな環境を利用することができるのです。常時SSL化はプレビューURLを共有する際に役立つだけでなく、本番さながらの環境でテストを行うのにも重宝するでしょう。テスト時にSSL化を徹底していないと、いざ本番にデプロイした際にセキュリティ警告が表示されたり、ユーザー体験が損なわれる可能性が生まれます。ちなみに最近のブラウザでは、
      <a
        href="https://www.digicert.com/blog/https-only-features-in-browsers/"
        target="_blank"
      >
        SSL化されていないサイトではBluetooth、ウェブカメラ、マイクといった機能がそもそも利用できなくなります
      </a>
      。
    </P>
    <H3 id="ship-with-speed">3. スピードが命</H3>
    <P>
      最近のフロントエンド開発において、サイトの速度ほど大事なことはありません。
      たとえば
      <a
        href="https://twitter.com/rauchg/status/1252312827131342848"
        target="_blank"
      >
        GoogleのLighthouseスコア
      </a>
      は、さまざまな観点からサイトの速度をそれぞれ数値化してくれますが、いずれの速度もサイトの検索順位に影響します。
    </P>
    <P>
      Vercelは
      <a target="_blank" href="https://vercel.com/edge-network">
        グローバルなエッジネットワーク
      </a>
      を運用しており、特に何もせずともデプロイする度にLighthouseで満点を取り続けることができます(訳註:
      Lighthouseのパフォーマンススコア)。Vercelの利用者が、CDNやサーバレスアーキテクチャの黒魔術を理解する必要はありません。ただVercelにPushするだけで、あなたのフロントエンドアプリは世界中のエッジにデプロイされ、静的コンテンツはキャッシュされ、またトップクラスの圧縮技術で圧縮されます(Vercelでは
      <a
        href="https://medium.com/oyotech/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4"
        target="_blank"
      >
        Brotli
      </a>
      が使われています。訳註:
      gzipも利用可)。フロントエンドのパフォーマンスにまつわる全ての指標に向けた最適化が行われ、その効果はプレビューURLで確かめることができるのです。
    </P>
    <P>
      また、Vercelはサイトの速度だけでなく、開発速度の向上にも一役買います。開発の軸足をローカルからクラウドに移すことで、より楽に、より速くプロダクトを改善できるようになるはずです。
    </P>
    <H2>これから</H2>
    <P>
      ユーザーにとってはより速く、開発者にとってはより開発しやすく。ウェブの新時代はまだ始まったばかりです。
    </P>
    <P>
      そんな時代をぜひ、
      <a href="https://vercel.com" target="_blank">
        Vercel
      </a>
      と共に歩んでみませんか。宜しければ、私達のツイッターも
      <a href="https://twitter.com/vercel">フォロー</a>
      してみてください。オープンなプラットフォームから生まれたVercelの、
      <a href="https://nextjs.org" target="_blank">
        どこまでもオープン
      </a>
      な物語が垣間見えることでしょう。
    </P>
  </Post>
));
