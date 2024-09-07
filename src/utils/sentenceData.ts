  interface SentenceEntry {
    sentence: string;
    words: string[];
  }

  interface SentenceData {
    [language: string]: SentenceEntry[];
  }

  export const sentenceData: SentenceData = {
    en: [
      { sentence: "The best way to predict the future is to invent it", words: ["The", "best", "way", "to", "predict", "the", "future", "is", "to", "invent", "it"] },
      { sentence: "In the end we will remember not the words of our enemies but the silence of our friends", words: ["In", "the", "end", "we", "will", "remember", "not", "the", "words", "of", "our", "enemies", "but", "the", "silence", "of", "our", "friends"] },
      { sentence: "The only limit to our realization of tomorrow is our doubts of today", words: ["The", "only", "limit", "to", "our", "realization", "of", "tomorrow", "is", "our", "doubts", "of", "today"] },
      { sentence: "You miss 100 percent of the shots you do not take", words: ["You", "miss", "100", "percent", "of", "the", "shots", "you", "do", "not", "take"] },
      { sentence: "It does not matter how slowly you go as long as you do not stop", words: ["It", "does", "not", "matter", "how", "slowly", "you", "go", "as", "long", "as", "you", "do", "not", "stop"] },
      { sentence: "Success is not final failure is not fatal It is the courage to continue that counts", words: ["Success", "is", "not", "final", "failure", "is", "not", "fatal", "It", "is", "the", "courage", "to", "continue", "that", "counts"] },
      { sentence: "The only way to do great work is to love what you do", words: ["The", "only", "way", "to", "do", "great", "work", "is", "to", "love", "what", "you", "do"] },
      { sentence: "You only live once but if you do it right once is enough", words: ["You", "only", "live", "once", "but", "if", "you", "do", "it", "right", "once", "is", "enough"] },
      { sentence: "Be yourself everyone else is already taken", words: ["Be", "yourself", "everyone", "else", "is", "already", "taken"] },
      { sentence: "Life is what happens when you are busy making other plans", words: ["Life", "is", "what", "happens", "when", "you", "are", "busy", "making", "other", "plans"] },
    ],    
    es: [
      { sentence: "La mejor manera de predecir el futuro es inventarlo", words: ["La", "mejor", "manera", "de", "predecir", "el", "futuro", "es", "inventarlo"] },
      { sentence: "Al final recordaremos no las palabras de nuestros enemigos sino el silencio de nuestros amigos", words: ["Al", "final", "recordaremos", "no", "las", "palabras", "de", "nuestros", "enemigos", "sino", "el", "silencio", "de", "nuestros", "amigos"] },
      { sentence: "El único límite a nuestra realización del mañana son nuestras dudas de hoy", words: ["El", "único", "límite", "a", "nuestra", "realización", "del", "mañana", "son", "nuestras", "dudas", "de", "hoy"] },
      { sentence: "Fallan el 100 por ciento de los tiros que no se toman", words: ["Fallan", "el", "100", "por", "ciento", "de", "los", "tiros", "que", "no", "se", "toman"] },
      { sentence: "No importa cuán despacio vayas siempre y cuando no te detengas", words: ["No", "importa", "cuán", "despacio", "vayas", "siempre", "y", "cuando", "no", "te", "detengas"] },
      { sentence: "El éxito no es final, el fracaso no es fatal. Es el coraje de continuar lo que cuenta", words: ["El", "éxito", "no", "es", "final", "el", "fracaso", "no", "es", "fatal", "Es", "el", "coraje", "de", "continuar", "lo", "que", "cuenta"] },
      { sentence: "La única manera de hacer un gran trabajo es amar lo que haces", words: ["La", "única", "manera", "de", "hacer", "un", "gran", "trabajo", "es", "amar", "lo", "que", "haces"] },
      { sentence: "Solo se vive una vez, pero si lo haces bien, una vez es suficiente", words: ["Solo", "se", "vive", "una", "vez", "pero", "si", "lo", "haces", "bien", "una", "vez", "es", "suficiente"] },
      { sentence: "Sé tú mismo; todos los demás ya están ocupados", words: ["Sé", "tú", "mismo", "todos", "los", "demás", "ya", "están", "ocupados"] },
      { sentence: "La vida es lo que sucede mientras estás ocupado haciendo otros planes", words: ["La", "vida", "es", "lo", "que", "sucede", "mientras", "estás", "ocupado", "haciendo", "otros", "planes"] }
  ],  
  fr: [
    { sentence: "La meilleure façon de prédire l'avenir est de l'inventer", words: ["La", "meilleure", "façon", "de", "prédire", "l'avenir", "est", "de", "l'inventer"] },
    { sentence: "À la fin, nous nous souviendrons non des mots de nos ennemis mais du silence de nos amis", words: ["À", "la", "fin", "nous", "nous", "souviendrons", "non", "des", "mots", "de", "nos", "ennemis", "mais", "du", "silence", "de", "nos", "amis"] },
    { sentence: "La seule limite à notre réalisation de demain est notre doute d'aujourd'hui", words: ["La", "seule", "limite", "à", "notre", "réalisation", "de", "demain", "est", "notre", "doute", "d'aujourd'hui"] },
    { sentence: "Vous manquez 100 % des tirs que vous ne prenez pas", words: ["Vous", "manquez", "100", "%", "des", "tirs", "que", "vous", "ne", "prenez", "pas"] },
    { sentence: "Peu importe la vitesse à laquelle vous allez tant que vous ne vous arrêtez pas", words: ["Peu", "importe", "la", "vitesse", "à", "laquelle", "vous", "allez", "tant", "que", "vous", "ne", "vous", "arrêtez", "pas"] },
    { sentence: "Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte", words: ["Le", "succès", "n'est", "pas", "final", "l'échec", "n'est", "pas", "fatal", "C'est", "le", "courage", "de", "continuer", "qui", "compte"] },
    { sentence: "La seule façon de faire un excellent travail est d'aimer ce que vous faites", words: ["La", "seule", "façon", "de", "faire", "un", "excellent", "travail", "est", "d'aimer", "ce", "que", "vous", "faites"] },
    { sentence: "On ne vit qu'une fois, mais si on le fait bien, une fois suffit", words: ["On", "ne", "vit", "qu'une", "fois", "mais", "si", "on", "le", "fait", "bien", "une", "fois", "suffit"] },
    { sentence: "Soyez vous-même; tous les autres sont déjà pris", words: ["Soyez", "vous-même", "tous", "les", "autres", "sont", "déjà", "pris"] },
    { sentence: "La vie, c'est ce qui se passe pendant que vous êtes occupé à faire d'autres projets", words: ["La", "vie", "c'est", "ce", "qui", "se", "passe", "pendant", "que", "vous", "êtes", "occupé", "à", "faire", "d'autres", "projets"] }
],
      
de: [
  { sentence: "Der beste Weg, die Zukunft vorauszusagen, ist, sie zu erfinden", words: ["Der", "beste", "Weg", "die", "Zukunft", "vorauszusagen", "ist", "sie", "zu", "erfinden"] },
  { sentence: "Am Ende werden wir uns nicht an die Worte unserer Feinde erinnern, sondern an das Schweigen unserer Freunde", words: ["Am", "Ende", "werden", "wir", "uns", "nicht", "an", "die", "Worte", "unserer", "Feinde", "erinnern", "sondern", "an", "das", "Schweigen", "unserer", "Freunde"] },
  { sentence: "Die einzige Grenze unserer Verwirklichung von morgen sind unsere Zweifel von heute", words: ["Die", "einzige", "Grenze", "unserer", "Verwirklichung", "von", "morgen", "sind", "unsere", "Zweifel", "von", "heute"] },
  { sentence: "Du verfehlst 100 Prozent der Schüsse, die du nicht abgibst", words: ["Du", "verfehlst", "100", "Prozent", "der", "Schüsse", "die", "du", "nicht", "abgibst"] },
  { sentence: "Es spielt keine Rolle, wie langsam du gehst, solange du nicht stehen bleibst", words: ["Es", "spielt", "keine", "Rolle", "wie", "langsam", "du", "gehst", "solange", "du", "nicht", "stehen", "bleibst"] },
  { sentence: "Erfolg ist nicht endgültig, Misserfolg ist nicht tödlich. Es ist der Mut, weiterzumachen, der zählt", words: ["Erfolg", "ist", "nicht", "endgültig", "Misserfolg", "ist", "nicht", "tödlich", "Es", "ist", "der", "Mut", "weiterzumachen", "der", "zählt"] },
  { sentence: "Der einzige Weg, großartige Arbeit zu leisten, besteht darin, das zu lieben, was du tust", words: ["Der", "einzige", "Weg", "großartige", "Arbeit", "zu", "leisten", "besteht", "darin", "das", "zu", "lieben", "was", "du", "tust"] },
  { sentence: "Man lebt nur einmal, aber wenn man es richtig macht, reicht einmal aus", words: ["Man", "lebt", "nur", "einmal", "aber", "wenn", "man", "es", "richtig", "macht", "reicht", "einmal", "aus"] },
  { sentence: "Sei du selbst; alle anderen sind bereits vergeben", words: ["Sei", "du", "selbst", "alle", "anderen", "sind", "bereits", "vergeben"] },
  { sentence: "Das Leben ist das, was passiert, während du beschäftigt bist, andere Pläne zu machen", words: ["Das", "Leben", "ist", "das", "was", "passiert", "während", "du", "beschäftigt", "bist", "andere", "Pläne", "zu", "machen"] }
],
it: [
  { sentence: "Il modo migliore per predire il futuro è inventarlo", words: ["Il", "modo", "migliore", "per", "predire", "il", "futuro", "è", "inventarlo"] },
  { sentence: "Alla fine ricorderemo non le parole dei nostri nemici, ma il silenzio dei nostri amici", words: ["Alla", "fine", "ricorderemo", "non", "le", "parole", "dei", "nostri", "nemici", "ma", "il", "silenzio", "dei", "nostri", "amici"] },
  { sentence: "L'unico limite alla nostra realizzazione di domani sono i nostri dubbi di oggi", words: ["L'unico", "limite", "alla", "nostra", "realizzazione", "di", "domani", "sono", "i", "nostri", "dubbi", "di", "oggi"] },
  { sentence: "Perdi il 100 percento dei tiri che non effettui", words: ["Perdi", "il", "100", "percento", "dei", "tiri", "che", "non", "effettui"] },
  { sentence: "Non importa quanto lentamente vai, finché non ti fermi", words: ["Non", "importa", "quanto", "lentamente", "vai", "finché", "non", "ti", "fermi"] },
  { sentence: "Il successo non è definitivo, il fallimento non è fatale. È il coraggio di continuare che conta", words: ["Il", "successo", "non", "è", "definitivo", "il", "fallimento", "non", "è", "fatale", "È", "il", "coraggio", "di", "continuare", "che", "conta"] },
  { sentence: "L'unico modo per fare un ottimo lavoro è amare ciò che fai", words: ["L'unico", "modo", "per", "fare", "un", "ottimo", "lavoro", "è", "amare", "ciò", "che", "fai"] },
  { sentence: "Si vive una sola volta, ma se lo fai bene, una volta basta", words: ["Si", "vive", "una", "sola", "volta", "ma", "se", "lo", "fai", "bene", "una", "volta", "basta"] },
  { sentence: "Sii te stesso; gli altri sono già stati presi", words: ["Sii", "te", "stesso", "gli", "altri", "sono", "già", "stati", "presi"] },
  { sentence: "La vita è ciò che accade mentre sei occupato a fare altri piani", words: ["La", "vita", "è", "ciò", "che", "accade", "mentre", "sei", "occupato", "a", "fare", "altri", "piani"] }
],
      
pt: [
  { sentence: "A melhor maneira de prever o futuro é inventá-lo", words: ["A", "melhor", "maneira", "de", "prever", "o", "futuro", "é", "inventá-lo"] },
  { sentence: "No final, lembraremos não das palavras dos nossos inimigos, mas do silêncio dos nossos amigos", words: ["No", "final", "lembraremos", "não", "das", "palavras", "dos", "nossos", "inimigos", "mas", "do", "silêncio", "dos", "nossos", "amigos"] },
  { sentence: "O único limite para a nossa realização do amanhã são as nossas dúvidas de hoje", words: ["O", "único", "limite", "para", "a", "nossa", "realização", "do", "amanhã", "são", "as", "nossas", "dúvidas", "de", "hoje"] },
  { sentence: "Você perde 100% dos tiros que não dá", words: ["Você", "perde", "100%", "dos", "tiros", "que", "não", "dá"] },
  { sentence: "Não importa o quão devagar você vá, desde que não pare", words: ["Não", "importa", "o", "quão", "devagar", "você", "vá", "desde", "que", "não", "pare"] },
  { sentence: "O sucesso não é final, o fracasso não é fatal. É a coragem de continuar que conta", words: ["O", "sucesso", "não", "é", "final", "o", "fracasso", "não", "é", "fatal", "É", "a", "coragem", "de", "continuar", "que", "conta"] },
  { sentence: "A única maneira de fazer um ótimo trabalho é amar o que você faz", words: ["A", "única", "maneira", "de", "fazer", "um", "ótimo", "trabalho", "é", "amar", "o", "que", "você", "faz"] },
  { sentence: "Você só vive uma vez, mas se fizer direito, uma vez é o suficiente", words: ["Você", "só", "vive", "uma", "vez", "mas", "se", "fizer", "direito", "uma", "vez", "é", "o", "suficiente"] },
  { sentence: "Seja você mesmo; todos os outros já foram escolhidos", words: ["Seja", "você", "mesmo", "todos", "os", "outros", "já", "foram", "escolhidos"] },
  { sentence: "A vida é o que acontece enquanto você está ocupado fazendo outros planos", words: ["A", "vida", "é", "o", "que", "acontece", "enquanto", "você", "está", "ocupado", "fazendo", "outros", "planos"] }
],
      
ru: [
  { sentence: "Лучший способ предсказать будущее - это изобрести его", words: ["Лучший", "способ", "предсказать", "будущее", "это", "изобрести", "его"] },
  { sentence: "В конце концов, мы будем помнить не слова наших врагов, а молчание наших друзей", words: ["В", "конце", "концов", "мы", "будем", "помнить", "не", "слова", "наших", "врагов", "а", "молчание", "наших", "друзей"] },
  { sentence: "Единственное ограничение нашей реализации завтрашнего дня - это наши сомнения сегодня", words: ["Единственное", "ограничение", "нашей", "реализации", "завтрашнего", "дня", "это", "наши", "сомнения", "сегодня"] },
  { sentence: "Вы промахиваетесь на 100 процентов тех попыток, которые не делаете", words: ["Вы", "промахиваетесь", "на", "100", "процентов", "тех", "попыток", "которые", "не", "делаете"] },
  { sentence: "Неважно, как медленно вы идете, пока вы не останавливаетесь", words: ["Неважно", "как", "медленно", "вы", "идете", "пока", "вы", "не", "останавливаетесь"] },
  { sentence: "Успех не окончателен, неудача не фатальна. Важна только смелость продолжать", words: ["Успех", "не", "окончателен", "неудача", "не", "фатальна", "Важна", "только", "смелость", "продолжать"] },
  { sentence: "Единственный способ делать отличную работу - любить то, что вы делаете", words: ["Единственный", "способ", "делать", "отличную", "работу", "любить", "то", "что", "вы", "делаете"] },
  { sentence: "Живешь только один раз, но если ты делаешь это правильно, один раз достаточно", words: ["Живешь", "только", "один", "раз", "но", "если", "ты", "делаешь", "это", "правильно", "один", "раз", "достаточно"] },
  { sentence: "Будь собой; все остальные уже заняты", words: ["Будь", "собой", "все", "остальные", "уже", "заняты"] },
  { sentence: "Жизнь - это то, что происходит, пока вы заняты составлением других планов", words: ["Жизнь", "это", "то", "что", "происходит", "пока", "вы", "заняты", "составлением", "других", "планов"] }
],
      
ja: [
  { sentence: "未来を予測する最良の方法は、それを発明することです", words: ["未来", "を", "予測する", "最良", "の", "方法", "は", "それ", "を", "発明する", "こと", "です"] },
  { sentence: "結局、私たちは敵の言葉ではなく、友達の沈黙を覚えているでしょう", words: ["結局", "私たち", "は", "敵", "の", "言葉", "では", "なく", "友達", "の", "沈黙", "を", "覚えている", "でしょう"] },
  { sentence: "明日を実現するための唯一の制限は、今日の疑念です", words: ["明日", "を", "実現する", "ための", "唯一", "の", "制限", "は", "今日", "の", "疑念", "です"] },
  { sentence: "撃たないショットは100パーセント外れる", words: ["撃たない", "ショット", "は", "100", "パーセント", "外れる"] },
  { sentence: "どんなに遅く進んでも、止まらない限り問題ありません", words: ["どんなに", "遅く", "進んでも", "止まらない", "限り", "問題", "ありません"] },
  { sentence: "成功は終わりではなく、失敗は致命的ではありません。重要なのは続ける勇気です", words: ["成功", "は", "終わり", "では", "なく", "失敗", "は", "致命的", "では", "ありません", "重要", "なのは", "続ける", "勇気", "です"] },
  { sentence: "素晴らしい仕事をする唯一の方法は、自分がしていることを愛することです", words: ["素晴らしい", "仕事", "を", "する", "唯一", "の", "方法", "は", "自分", "が", "している", "こと", "を", "愛する", "こと", "です"] },
  { sentence: "一度だけ生きますが、正しくすれば一度で十分です", words: ["一度", "だけ", "生きます", "が", "正しく", "すれば", "一度", "で", "十分", "です"] },
  { sentence: "自分自身でいてください。他の全てはすでに取られています", words: ["自分", "自身", "で", "いてください", "他", "の", "全て", "は", "すでに", "取られています"] },
  { sentence: "人生とは、他の計画を立てている間に起こることです", words: ["人生", "とは", "他", "の", "計画", "を", "立てている", "間", "に", "起こる", "こと", "です"] }
],
      
zh: [
  { sentence: "预测未来的最佳方法是发明未来", words: ["预测", "未来", "的", "最佳", "方法", "是", "发明", "未来"] },
  { sentence: "最终，我们会记住的不是敌人的话，而是朋友的沉默", words: ["最终", "我们", "会", "记住", "的", "不是", "敌人", "的", "话", "而是", "朋友", "的", "沉默"] },
  { sentence: "我们对明天的实现的唯一限制是我们对今天的怀疑", words: ["我们", "对", "明天", "的", "实现", "的", "唯一", "限制", "是", "我们", "对", "今天", "的", "怀疑"] },
  { sentence: "你错过了100%你没有尝试的机会", words: ["你", "错过了", "100%", "你", "没有", "尝试", "的", "机会"] },
  { sentence: "不管你走得多慢，只要你不停下来就没关系", words: ["不管", "你", "走得", "多", "慢", "只要", "你", "不停下来", "就", "没关系"] },
  { sentence: "成功不是终点，失败不是致命的。重要的是继续前进的勇气", words: ["成功", "不是", "终点", "失败", "不是", "致命", "的", "重要", "是", "继续", "前进", "的", "勇气"] },
  { sentence: "做伟大工作的唯一方法是爱你所做的", words: ["做", "伟大", "工作的", "唯一", "方法", "是", "爱", "你", "所做", "的"] },
  { sentence: "你只活一次，但如果做得对，一次就足够了", words: ["你", "只", "活", "一次", "但", "如果", "做得", "对", "一次", "就", "足够了"] },
  { sentence: "做你自己；其他人都已经被占用了", words: ["做", "你", "自己", "其他", "人", "都", "已经", "被", "占用了"] },
  { sentence: "生活就是你忙着制定其他计划时发生的事", words: ["生活", "就是", "你", "忙着", "制定", "其他", "计划", "时", "发生的", "事"] }
],
      
ar: [
  { sentence: "أفضل طريقة للتنبؤ بالمستقبل هي اختراعه", words: ["أفضل", "طريقة", "للتنبؤ", "بالمستقبل", "هي", "اختراعه"] },
  { sentence: "في النهاية، سنتذكر ليس كلمات أعدائنا، بل صمت أصدقائنا", words: ["في", "النهاية", "سنتذكر", "ليس", "كلمات", "أعدائنا", "بل", "صمت", "أصدقائنا"] },
  { sentence: "الحد الوحيد لتحقيقنا للغد هو شكوكنا في اليوم", words: ["الحد", "الوحيد", "لتحقيقنا", "للغد", "هو", "شكوكنا", "في", "اليوم"] },
  { sentence: "أنت تفوت 100% من الفرص التي لا تأخذها", words: ["أنت", "تفوت", "100%", "من", "الفرص", "التي", "لا", "تأخذها"] },
  { sentence: "لا يهم كم بطيء تسير طالما أنك لا تتوقف", words: ["لا", "يهم", "كم", "بطيء", "تسير", "طالما", "أنك", "لا", "تتوقف"] },
  { sentence: "النجاح ليس نهائيًا، والفشل ليس قاتلاً. الشجاعة للاستمرار هي الأهم", words: ["النجاح", "ليس", "نهائيًا", "والفشل", "ليس", "قاتلاً", "الشجاعة", "للاستمرار", "هي", "الأهم"] },
  { sentence: "الطريقة الوحيدة للقيام بعمل رائع هي حب ما تفعله", words: ["الطريقة", "الوحيدة", "للقيام", "بعمل", "رائع", "هي", "حب", "ما", "تفعله"] },
  { sentence: "أنت تعيش مرة واحدة فقط، ولكن إذا قمت بذلك بشكل صحيح، فإن مرة واحدة كافية", words: ["أنت", "تعيش", "مرة", "واحدة", "فقط", "ولكن", "إذا", "قمت", "بذلك", "بشكل", "صحيح", "فإن", "مرة", "واحدة", "كافية"] },
  { sentence: "كن نفسك؛ فالآخرون مشغولون بالفعل", words: ["كن", "نفسك", "فالآخرون", "مشغولون", "بالفعل"] },
  { sentence: "الحياة هي ما يحدث بينما تكون مشغولاً بوضع خطط أخرى", words: ["الحياة", "هي", "ما", "يحدث", "بينما", "تكون", "مشغولاً", "بوضع", "خطط", "أخرى"] }
],
      
ko: [
  { sentence: "미래를 예측하는 가장 좋은 방법은 그것을 발명하는 것이다", words: ["미래", "를", "예측하는", "가장", "좋은", "방법", "은", "그것", "을", "발명하는", "것", "이다"] },
  { sentence: "결국 우리는 적의 말이 아니라 친구의 침묵을 기억할 것이다", words: ["결국", "우리는", "적", "의", "말", "이", "아니라", "친구", "의", "침묵", "을", "기억할", "것이다"] },
  { sentence: "내일을 실현하는 유일한 한계는 오늘의 의심이다", words: ["내일", "을", "실현하는", "유일한", "한계", "는", "오늘", "의", "의심", "이다"] },
  { sentence: "시도하지 않은 기회는 100% 놓친다", words: ["시도하지", "않은", "기회", "는", "100%", "놓친다"] },
  { sentence: "얼마나 천천히 가든 상관없다, 멈추지 않는 한", words: ["얼마나", "천천히", "가든", "상관없다", "멈추지", "않는", "한"] },
  { sentence: "성공은 끝이 아니고, 실패는 치명적이지 않다. 중요한 것은 계속하는 용기이다", words: ["성공", "은", "끝이", "아니고", "실패", "는", "치명적이지", "않다", "중요한", "것은", "계속하는", "용기", "이다"] },
  { sentence: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다", words: ["위대한", "일", "을", "하는", "유일한", "방법", "은", "당신이", "하는", "일", "을", "사랑하는", "것이다"] },
  { sentence: "한 번만 살지만, 제대로 한다면 한 번이면 충분하다", words: ["한", "번만", "살지만", "제대로", "한다면", "한", "번", "이면", "충분하다"] },
  { sentence: "자신이 되라; 다른 모든 것은 이미 차지됐다", words: ["자신이", "되라", "다른", "모든", "것은", "이미", "차지됐다"] },
  { sentence: "인생은 당신이 다른 계획을 세우느라 바쁠 때 일어나는 일이다", words: ["인생", "은", "당신이", "다른", "계획", "을", "세우느라", "바쁠", "때", "일어나는", "일이다"] }
],

nl: [
  { sentence: "De beste manier om de toekomst te voorspellen is deze uitvinden", words: ["De", "beste", "manier", "om", "de", "toekomst", "te", "voorspellen", "is", "deze", "uitvinden"] },
  { sentence: "Uiteindelijk zullen we niet de woorden van onze vijanden herinneren, maar de stilte van onze vrienden", words: ["Uiteindelijk", "zullen", "we", "niet", "de", "woorden", "van", "onze", "vijanden", "herinneren", "maar", "de", "stilte", "van", "onze", "vrienden"] },
  { sentence: "De enige beperking voor onze realisatie van morgen zijn onze twijfels van vandaag", words: ["De", "enige", "beperking", "voor", "onze", "realisatie", "van", "morgen", "zijn", "onze", "twijfels", "van", "vandaag"] },
  { sentence: "Je mist 100 procent van de kansen die je niet neemt", words: ["Je", "mist", "100", "procent", "van", "de", "kansen", "die", "je", "niet", "neemt"] },
  { sentence: "Het doet er niet toe hoe langzaam je gaat, zolang je maar niet stopt", words: ["Het", "doet", "er", "niet", "toe", "hoe", "langzaam", "je", "gaat", "zolang", "je", "maar", "niet", "stopt"] },
  { sentence: "Succes is niet definitief, falen is niet fataal. Het is de moed om door te gaan die telt", words: ["Succes", "is", "niet", "definitief", "falen", "is", "niet", "fataal", "Het", "is", "de", "moed", "om", "door", "te", "gaan", "die", "telt"] },
  { sentence: "De enige manier om groot werk te doen is van wat je doet houden", words: ["De", "enige", "manier", "om", "groot", "werk", "te", "doen", "is", "van", "wat", "je", "doet", "houden"] },
  { sentence: "Je leeft maar één keer, maar als je het goed doet, is één keer genoeg", words: ["Je", "leeft", "maar", "één", "keer", "maar", "als", "je", "het", "goed", "doet", "is", "één", "keer", "genoeg"] },
  { sentence: "Wees jezelf; iedereen anders is al bezet", words: ["Wees", "jezelf", "iedereen", "anders", "is", "al", "bezet"] },
  { sentence: "Het leven is wat er gebeurt terwijl je bezig bent andere plannen te maken", words: ["Het", "leven", "is", "wat", "er", "gebeurt", "terwijl", "je", "bezig", "bent", "andere", "plannen", "te", "maken"] }
],
      
pl: [
  { sentence: "Najlepszym sposobem przewidywania przyszłości jest jej wynalezienie", words: ["Najlepszym", "sposobem", "przewidywania", "przyszłości", "jest", "jej", "wynalezienie"] },
  { sentence: "Na końcu nie będziemy pamiętać słów naszych wrogów, ale ciszę naszych przyjaciół", words: ["Na", "końcu", "nie", "będziemy", "pamiętać", "słów", "naszych", "wrogów", "ale", "ciszę", "naszych", "przyjaciół"] },
  { sentence: "Jedynym ograniczeniem naszej realizacji jutra są nasze wątpliwości dzisiaj", words: ["Jedynym", "ograniczeniem", "naszej", "realizacji", "jutra", "są", "nasze", "wątpliwości", "dzisiaj"] },
  { sentence: "Nie próbując, tracisz 100 procent szans", words: ["Nie", "próbując", "tracisz", "100", "procent", "szans"] },
  { sentence: "Nie ma znaczenia, jak wolno idziesz, o ile się nie zatrzymasz", words: ["Nie", "ma", "znaczenia", "jak", "wolno", "idziesz", "o", "ile", "się", "nie", "zatrzymasz"] },
  { sentence: "Sukces nie jest ostateczny, porażka nie jest śmiertelna. Liczy się odwaga, by kontynuować", words: ["Sukces", "nie", "jest", "ostateczny", "porażka", "nie", "jest", "śmiertelna", "Liczy", "się", "odwaga", "by", "kontynuować"] },
  { sentence: "Jedynym sposobem na wykonanie wielkiej pracy jest kochanie tego, co robisz", words: ["Jedynym", "sposobem", "na", "wykonanie", "wielkiej", "pracy", "jest", "kochanie", "tego", "co", "robisz"] },
  { sentence: "Żyjesz tylko raz, ale jeśli robisz to dobrze, raz wystarczy", words: ["Żyjesz", "tylko", "raz", "ale", "jeśli", "robisz", "to", "dobrze", "raz", "wystarczy"] },
  { sentence: "Bądź sobą; wszyscy inni są już zajęci", words: ["Bądź", "sobą", "wszyscy", "inni", "są", "już", "zajęci"] },
  { sentence: "Życie to to, co się dzieje, gdy jesteś zajęty robieniem innych planów", words: ["Życie", "to", "to", "co", "się", "dzieje", "gdy", "jesteś", "zajęty", "robieniem", "innych", "planów"] }
],
      
sv: [
  { sentence: "Det bästa sättet att förutsäga framtiden är att uppfinna den", words: ["Det", "bästa", "sättet", "att", "förutsäga", "framtiden", "är", "att", "uppfinna", "den"] },
  { sentence: "I slutet kommer vi inte att minnas våra fienders ord utan våra vänners tystnad", words: ["I", "slutet", "kommer", "vi", "inte", "att", "minnas", "våra", "fienders", "ord", "utan", "våra", "vänners", "tystnad"] },
  { sentence: "Den enda begränsningen för vår förverkligande av morgondagen är våra tvivel idag", words: ["Den", "enda", "begränsningen", "för", "vår", "förverkligande", "av", "morgondagen", "är", "våra", "tvivel", "idag"] },
  { sentence: "Du missar 100 procent av de skott du inte tar", words: ["Du", "missar", "100", "procent", "av", "de", "skott", "du", "inte", "tar"] },
  { sentence: "Det spelar ingen roll hur långsamt du går, så länge du inte slutar", words: ["Det", "spelar", "ingen", "roll", "hur", "långsamt", "du", "går", "så", "länge", "du", "inte", "slutar"] },
  { sentence: "Framgång är inte slutgiltig, misslyckande är inte dödligt. Det är modet att fortsätta som räknas", words: ["Framgång", "är", "inte", "slutgiltig", "misslyckande", "är", "inte", "dödligt", "Det", "är", "modet", "att", "fortsätta", "som", "räknas"] },
  { sentence: "Det enda sättet att göra stort arbete är att älska det du gör", words: ["Det", "enda", "sättet", "att", "göra", "stort", "arbete", "är", "att", "älska", "det", "du", "gör"] },
  { sentence: "Du lever bara en gång, men om du gör det rätt, räcker en gång", words: ["Du", "lever", "bara", "en", "gång", "men", "om", "du", "gör", "det", "rätt", "räcker", "en", "gång"] },
  { sentence: "Var dig själv; alla andra är redan upptagna", words: ["Var", "dig", "själv", "alla", "andra", "är", "redan", "upptagna"] },
  { sentence: "Livet är vad som händer när du är upptagen med att göra andra planer", words: ["Livet", "är", "vad", "som", "händer", "när", "du", "är", "upptagen", "med", "att", "göra", "andra", "planer"] }
],
kn: [
  { sentence: "ಭವಿಷ್ಯವನ್ನು ಊಹಿಸುವ ಅತ್ಯುತ್ತಮ ಮಾರ್ಗವೆಂದರೆ ಅದನ್ನು ರೂಪಿಸೋದು", words: ["ಭವಿಷ್ಯ", "ವನ್ನು", "ಊಹಿಸುವ", "ಅತ್ಯುತ್ತಮ", "ಮಾರ್ಗವೆಂದರೆ", "ಅದನ್ನು", "ರೂಪಿಸೋದು"] },
  { sentence: "ನಾವು ಕೊನೆಗೆ ಶತ್ರುಗಳ ಮಾತುಗಳನ್ನು ನೆನಪಿಸೋದು ಅಲ್ಲ, ನಮ್ಮ ಸ್ನೇಹಿತರ ಮೌನವನ್ನು ನೆನಪಿಸುತ್ತೇವೆ", words: ["ನಾವು", "ಕೊನೆಗೆ", "ಶತ್ರುಗಳ", "ಮಾತುಗಳನ್ನು", "ನೆನಪಿಸೋದು", "ಅಲ್ಲ", "ನಮ್ಮ", "ಸ್ನೇಹಿತರ", "ಮೌನವನ್ನು", "ನೆನಪಿಸುತ್ತೇವೆ"] },
  { sentence: "ನಾಳೆಯ ಹಸಿವನ್ನು ನಮ್ಮ ಇ today'sವನೇ ಮಾರ್ಗವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ", words: ["ನಾಳೆಯ", "ಹಸಿವನ್ನು", "ನಮ್ಮ", "ಇಂದಿನ", "ಮಾರ್ಗವನ್ನು", "ನಿಯಂತ್ರಿಸುತ್ತದೆ"] },
  { sentence: "ನೀವು ತೆಗೆದಿಲ್ಲದ ಶಾಟುಗಳನ್ನು 100 ಶತಮಾನಗಳಷ್ಟು ತಪ್ಪಿಸುತ್ತೀರಿ", words: ["ನೀವು", "ತೆಗೆಯದ", "ಶಾಟುಗಳನ್ನು", "100", "ಶತಮಾನಗಳಷ್ಟು", "ತಪ್ಪಿಸುತ್ತೀರಿ"] },
  { sentence: "ನೀವು ನಿಲ್ಲಿಸದವರೆಗೆ, ಎಷ್ಟು ನಿಧಾನವಾಗಿ ಹೋಗುತ್ತೀರಿ ಎಂಬುದಕ್ಕೆ ಯಾವುದೇ ಅರ್ಥವಿಲ್ಲ", words: ["ನೀವು", "ನಿಲ್ಲಿಸದವರೆಗೆ", "ಎಷ್ಟು", "ನಿಧಾನವಾಗಿ", "ಹೋಗುತ್ತೀರಿ", "ಎಂಬುದಕ್ಕೆ", "ಯಾವುದೇ", "ಅರ್ಥವಿಲ್ಲ"] },
  { sentence: "ಯಶಸ್ಸು ಅಂತಿಮವಲ್ಲ, ವಿಫಲತೆ ಶಸ್ತ್ರಪಟದವಲ್ಲ. ಇದು ಮುಂದುವರಿಯುವ ಧೈರ್ಯ", words: ["ಯಶಸ್ಸು", "ಅಂತಿಮವಲ್ಲ", "ವಿಫಲತೆ", "ಶಸ್ತ್ರಪಟದವಲ್ಲ", "ಇದು", "ಮುಂಬರುವ", "ಧೈರ್ಯ"] },
  { sentence: "ಉತ್ತಮ ಕೆಲಸ ಮಾಡಲು ಏಕೈಕ ಮಾರ್ಗವೆಂದರೆ ನೀವು ಮಾಡುವುದನ್ನು ಪ್ರೀತಿಸುವುದು", words: ["ಉತ್ತಮ", "ಕೆಲಸದ", "ಮಾರ್ಗವೆಂದರೆ", "ನೀವು", "ಮಾಡುವ", "ವಿಷಯ", "ಪ್ರೀತಿಸುವುದು"] },
  { sentence: "ನೀವು ಒಂದೇ ಬಾರಿಗೆ ಜೀವನವಿದೆ ಆದರೆ ನೀವು ಅದನ್ನು ಸರಿಯಾಗಿ ಮಾಡಿದರೆ ಒಂದೇ ಬಾರಿಗೆ ಸಾಕು", words: ["ನೀವು", "ಒಂದೇ", "ಬಾರಿಗೆ", "ಜೀವನವಿದೆ", "ಆದರೆ", "ನೀವು", "ಅದನ್ನು", "ಸರಿಯಾಗಿ", "ಮಾಡಿದರೆ", "ಒಂದೇ", "ಬಾರಿಗೆ", "ಸಾಕು"] },
  { sentence: "ನೀನು ನಿನ್ನದೇ ಆಗು; ಇತರ ಎಲ್ಲಾ ಇಡೀ occupationದಾಗಿ", words: ["ನೀನು", "ನಿನ್ನದೇ", "ಆಗು", "ಇತರ", "ಎಲ್ಲಾ", "ಇಡೀ", "occupationದಾಗಿ"] },
  { sentence: "ಜೀವನವು ನಿನ್ನ ಇತರ ಯೋಜನೆಗಳನ್ನು ಮಾಡಲು ಬ್ಯುಸಿ ಆಗಿರುವಾಗ ಏನಾಗುತ್ತದೆ", words: ["ಜೀವನವು", "ನಿನ್ನ", "ಇತರ", "ಯೋಜನೆಗಳನ್ನು", "ಮಾಡಲು", "ಬ್ಯುಸಿ", "ಆಗಿರುವಾಗ", "ಏನಾಗುತ್ತದೆ"] }
],
hi: [
  { sentence: "भविष्य की भविष्यवाणी करने का सबसे अच्छा तरीका है उसे आविष्कार करना", words: ["भविष्य", "की", "भविष्यवाणी", "करने", "का", "सबसे", "अच्छा", "तरीका", "है", "उसे", "आविष्कार", "करना"] },
  { sentence: "आखिरकार हम हमारे दुश्मनों के शब्दों को नहीं बल्कि हमारे दोस्तों की चुप्पी को याद करेंगे", words: ["आखिरकार", "हम", "हमारे", "दुश्मनों", "के", "शब्दों", "को", "नहीं", "बल्कि", "हमारे", "दोस्तों", "की", "चुप्पी", "को", "याद", "करेंगे"] },
  { sentence: "कल की हमारी उपलब्धि की एकमात्र सीमा आज के हमारे संदेह हैं", words: ["कल", "की", "हमारी", "उपलब्धि", "की", "एकमात्र", "सीमा", "आज", "के", "हमारे", "संदेह", "हैं"] },
  { sentence: "आप उन अवसरों को 100 प्रतिशत खो देते हैं जो आप नहीं लेते", words: ["आप", "उन", "अवसरों", "को", "100", "प्रतिशत", "खो", "देते", "हैं", "जो", "आप", "नहीं", "लेते"] },
  { sentence: "इससे कोई फर्क नहीं पड़ता कि आप कितनी धीरे-धीरे जाते हैं, जब तक आप नहीं रुकते", words: ["इससे", "कोई", "फर्क", "नहीं", "पड़ता", "कि", "आप", "कितनी", "धीरे-धीरे", "जाते", "हैं", "जब", "तक", "आप", "नहीं", "रुकते"] },
  { sentence: "सफलता अंतिम नहीं है, विफलता घातक नहीं है। जो मायने रखता है वह है जारी रखने का साहस", words: ["सफलता", "अंतिम", "नहीं", "है", "विफलता", "घातक", "नहीं", "है", "जो", "मायने", "रखता", "है", "वह", "है", "जारी", "रखने", "का", "साहस"] },
  { sentence: "महान काम करने का एकमात्र तरीका है जो आप करते हैं उसे पसंद करना", words: ["महान", "काम", "करने", "का", "एकमात्र", "तरीका", "है", "जो", "आप", "करते", "हैं", "उसे", "पसंद", "करना"] },
  { sentence: "आप केवल एक बार ही जीते हैं, लेकिन यदि आप इसे सही ढंग से करते हैं, तो एक बार पर्याप्त है", words: ["आप", "केवल", "एक", "बार", "ही", "जीते", "हैं", "लेकिन", "यदि", "आप", "इसे", "सही", "ढंग", "से", "करते", "हैं", "तो", "एक", "बार", "पर्याप्त", "है"] },
  { sentence: "स्वयं बनो; बाकी सभी पहले से ही लिए जा चुके हैं", words: ["स्वयं", "बनो", "बाकी", "सभी", "पहले", "से", "ही", "लिए", "जा", "चुके", "हैं"] },
  { sentence: "जिंदगी वही है जो तब होती है जब आप अन्य योजनाएं बनाने में व्यस्त होते हैं", words: ["जिंदगी", "वही", "है", "जो", "तब", "होती", "है", "जब", "आप", "अन्य", "योजनाएं", "बनाने", "में", "व्यस्त", "होते", "हैं"] }
],    
    };
    