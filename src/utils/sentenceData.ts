interface SentenceEntry {
  sentence: string;
  words: string[];
}

interface SentenceData {
  [language: string]: SentenceEntry[];
}

export const sentenceData: SentenceData = {
    en: [
      { sentence: "The quick brown fox jumps over the lazy dog", words: ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] },
      { sentence: "A journey of a thousand miles begins with a single step", words: ["A", "journey", "of", "a", "thousand", "miles", "begins", "with", "a", "single", "step"] },
      { sentence: "To be, or not to be, that is the question", words: ["To", "be", "or", "not", "to", "be", "that", "is", "the", "question"] },
      { sentence: "All that glitters is not gold", words: ["All", "that", "glitters", "is", "not", "gold"] },
      { sentence: "Actions speak louder than words", words: ["Actions", "speak", "louder", "than", "words"] },
      { sentence: "Fortune favors the bold", words: ["Fortune", "favors", "the", "bold"] },
      { sentence: "The pen is mightier than the sword", words: ["The", "pen", "is", "mightier", "than", "the", "sword"] },
      { sentence: "Knowledge is power", words: ["Knowledge", "is", "power"] },
      { sentence: "Time is money", words: ["Time", "is", "money"] },
      { sentence: "The early bird catches the worm", words: ["The", "early", "bird", "catches", "the", "worm"] },
    ],
    es:[
      { sentence: "El zorro marrón rápido salta sobre el perro perezoso", words: ["El", "zorro", "marrón", "rápido", "salta", "sobre", "el", "perro", "perezoso"] },
      { sentence: "Un viaje de mil millas comienza con un solo paso", words: ["Un", "viaje", "de", "mil", "millas", "comienza", "con", "un", "solo", "paso"] },
      { sentence: "Ser o no ser, esa es la cuestión", words: ["Ser", "o", "no", "ser", "esa", "es", "la", "cuestión"] },
      { sentence: "No todo lo que brilla es oro", words: ["No", "todo", "lo", "que", "brilla", "es", "oro"] },
      { sentence: "Las acciones hablan más que las palabras", words: ["Las", "acciones", "hablan", "más", "que", "las", "palabras"] },
      { sentence: "La fortuna favorece a los valientes", words: ["La", "fortuna", "favorece", "a", "los", "valientes"] },
      { sentence: "La pluma es más poderosa que la espada", words: ["La", "pluma", "es", "más", "poderosa", "que", "la", "espada"] },
      { sentence: "El conocimiento es poder", words: ["El", "conocimiento", "es", "poder"] },
      { sentence: "El tiempo es oro", words: ["El", "tiempo", "es", "oro"] },
      { sentence: "El que madruga Dios lo ayuda", words: ["El", "que", "madruga", "Dios", "lo", "ayuda"] },
    ],
    fr: [
      { sentence: "Le renard brun rapide saute par-dessus le chien paresseux", words: ["Le", "renard", "brun", "rapide", "saute", "par-dessus", "le", "chien", "paresseux"] },
      { sentence: "Un voyage de mille lieues commence par un seul pas", words: ["Un", "voyage", "de", "mille", "lieues", "commence", "par", "un", "seul", "pas"] },
      { sentence: "Être ou ne pas être, telle est la question", words: ["Être", "ou", "ne", "pas", "être", "telle", "est", "la", "question"] },
      { sentence: "Tout ce qui brille n'est pas or", words: ["Tout", "ce", "qui", "brille", "n'est", "pas", "or"] },
      { sentence: "Les actions parlent plus fort que les mots", words: ["Les", "actions", "parlent", "plus", "fort", "que", "les", "mots"] },
      { sentence: "La fortune sourit aux audacieux", words: ["La", "fortune", "sourit", "aux", "audacieux"] },
      { sentence: "La plume est plus puissante que l'épée", words: ["La", "plume", "est", "plus", "puissante", "que", "l'épée"] },
      { sentence: "Le savoir est le pouvoir", words: ["Le", "savoir", "est", "le", "pouvoir"] },
      { sentence: "Le temps c'est de l'argent", words: ["Le", "temps", "c'est", "de", "l'argent"] },
      { sentence: "L'avenir appartient à ceux qui se lèvent tôt", words: ["L'avenir", "appartient", "à", "ceux", "qui", "se", "lèvent", "tôt"] },
    ],
    
    de : [
      { sentence: "Der schnelle braune Fuchs springt über den faulen Hund", words: ["Der", "schnelle", "braune", "Fuchs", "springt", "über", "den", "faulen", "Hund"] },
      { sentence: "Eine Reise von tausend Meilen beginnt mit einem einzigen Schritt", words: ["Eine", "Reise", "von", "tausend", "Meilen", "beginnt", "mit", "einem", "einzigen", "Schritt"] },
      { sentence: "Sein oder Nichtsein, das ist hier die Frage", words: ["Sein", "oder", "Nichtsein", "das", "ist", "hier", "die", "Frage"] },
      { sentence: "Alles was glänzt, ist nicht Gold", words: ["Alles", "was", "glänzt", "ist", "nicht", "Gold"] },
      { sentence: "Taten sagen mehr als Worte", words: ["Taten", "sagen", "mehr", "als", "Worte"] },
      { sentence: "Das Glück bevorzugt die Mutigen", words: ["Das", "Glück", "bevorzugt", "die", "Mutigen"] },
      { sentence: "Die Feder ist mächtiger als das Schwert", words: ["Die", "Feder", "ist", "mächtiger", "als", "das", "Schwert"] },
      { sentence: "Wissen ist Macht", words: ["Wissen", "ist", "Macht"] },
      { sentence: "Zeit ist Geld", words: ["Zeit", "ist", "Geld"] },
      { sentence: "Der frühe Vogel fängt den Wurm", words: ["Der", "frühe", "Vogel", "fängt", "den", "Wurm"] },
    ],
    
    it : [
      { sentence: "La veloce volpe marrone salta sopra il cane pigro", words: ["La", "veloce", "volpe", "marrone", "salta", "sopra", "il", "cane", "pigro"] },
      { sentence: "Un viaggio di mille miglia inizia con un solo passo", words: ["Un", "viaggio", "di", "mille", "miglia", "inizia", "con", "un", "solo", "passo"] },
      { sentence: "Essere o non essere, questo è il problema", words: ["Essere", "o", "non", "essere", "questo", "è", "il", "problema"] },
      { sentence: "Non tutto ciò che luccica è oro", words: ["Non", "tutto", "ciò", "che", "luccica", "è", "oro"] },
      { sentence: "Le azioni parlano più delle parole", words: ["Le", "azioni", "parlano", "più", "delle", "parole"] },
      { sentence: "La fortuna aiuta gli audaci", words: ["La", "fortuna", "aiuta", "gli", "audaci"] },
      { sentence: "La penna è più potente della spada", words: ["La", "penna", "è", "più", "potente", "della", "spada"] },
      { sentence: "La conoscenza è potere", words: ["La", "conoscenza", "è", "potere"] },
      { sentence: "Il tempo è denaro", words: ["Il", "tempo", "è", "denaro"] },
      { sentence: "Chi dorme non piglia pesci", words: ["Chi", "dorme", "non", "piglia", "pesci"] },
    ],
    
     pt : [
      { sentence: "A rápida raposa marrom pula sobre o cachorro preguiçoso", words: ["A", "rápida", "raposa", "marrom", "pula", "sobre", "o", "cachorro", "preguiçoso"] },
      { sentence: "Uma jornada de mil milhas começa com um único passo", words: ["Uma", "jornada", "de", "mil", "milhas", "começa", "com", "um", "único", "passo"] },
      { sentence: "Ser ou não ser, eis a questão", words: ["Ser", "ou", "não", "ser", "eis", "a", "questão"] },
      { sentence: "Nem tudo que reluz é ouro", words: ["Nem", "tudo", "que", "reluz", "é", "ouro"] },
      { sentence: "Ações falam mais alto que palavras", words: ["Ações", "falam", "mais", "alto", "que", "palavras"] },
      { sentence: "A sorte favorece os audaciosos", words: ["A", "sorte", "favorece", "os", "audaciosos"] },
      { sentence: "A pena é mais poderosa que a espada", words: ["A", "pena", "é", "mais", "poderosa", "que", "a", "espada"] },
      { sentence: "O conhecimento é poder", words: ["O", "conhecimento", "é", "poder"] },
      { sentence: "Tempo é dinheiro", words: ["Tempo", "é", "dinheiro"] },
      { sentence: "Deus ajuda quem cedo madruga", words: ["Deus", "ajuda", "quem", "cedo", "madruga"] },
    ],
    
     ru : [
      { sentence: "Быстрая коричневая лисица прыгает через ленивую собаку", words: ["Быстрая", "коричневая", "лисица", "прыгает", "через", "ленивую", "собаку"] },
      { sentence: "Путь в тысячу миль начинается с одного шага", words: ["Путь", "в", "тысячу", "миль", "начинается", "с", "одного", "шага"] },
      { sentence: "Быть или не быть, вот в чём вопрос", words: ["Быть", "или", "не", "быть", "вот", "в", "чём", "вопрос"] },
      { sentence: "Не всё то золото, что блестит", words: ["Не", "всё", "то", "золото", "что", "блестит"] },
      { sentence: "Действия говорят громче слов", words: ["Действия", "говорят", "громче", "слов"] },
      { sentence: "Судьба благоволит смелым", words: ["Судьба", "благоволит", "смелым"] },
      { sentence: "Перо сильнее меча", words: ["Перо", "сильнее", "меча"] },
      { sentence: "Знание — сила", words: ["Знание", "сила"] },
      { sentence: "Время — деньги", words: ["Время", "деньги"] },
      { sentence: "Ранняя пташка ловит червяка", words: ["Ранняя", "пташка", "ловит", "червяка"] },
    ],
    
     ja : [
      { sentence: "速い茶色の狐が怠け者の犬を飛び越えます", words: ["速い", "茶色", "の", "狐", "が", "怠け者", "の", "犬", "を", "飛び越えます"] },
      { sentence: "千里の道も一歩から", words: ["千里", "の", "道", "も", "一歩", "から"] },
      { sentence: "生きるべきか死ぬべきか、それが問題だ", words: ["生きるべき", "か", "死ぬべき", "か", "それ", "が", "問題だ"] },
      { sentence: "光るものすべてが金ではない", words: ["光る", "もの", "すべて", "が", "金", "では", "ない"] },
      { sentence: "行動は言葉よりも雄弁である", words: ["行動", "は", "言葉", "よりも", "雄弁", "である"] },
      { sentence: "運は勇者に味方する", words: ["運", "は", "勇者", "に", "味方する"] },
      { sentence: "ペンは剣よりも強し", words: ["ペン", "は", "剣", "よりも", "強し"] },
      { sentence: "知識は力なり", words: ["知識", "は", "力なり"] },
      { sentence: "時間は金なり", words: ["時間", "は", "金なり"] },
      { sentence: "早起きは三文の得", words: ["早起き", "は", "三文", "の", "得"] },
    ],
    
     zh : [
      { sentence: "快速的棕色狐狸跳过懒狗", words: ["快速", "的", "棕色", "狐狸", "跳过", "懒", "狗"] },
      { sentence: "千里之行，始于足下", words: ["千里", "之", "行", "始于", "足下"] },
      { sentence: "生存还是毁灭，这个问题", words: ["生存", "还是", "毁灭", "这", "是", "个", "问题"] },
      { sentence: "闪光的东西不全是金子", words: ["闪光", "的", "东西", "不", "全", "是", "金子"] },
      { sentence: "行动胜于言辞", words: ["行动", "胜于", "言辞"] },
      { sentence: "幸运之神眷顾勇者", words: ["幸运", "之", "神", "眷顾", "勇者"] },
      { sentence: "笔比剑更强大", words: ["笔", "比", "剑", "更", "强大"] },
      { sentence: "知识就是力量", words: ["知识", "就是", "力量"] },
      { sentence: "时间就是金钱", words: ["时间", "就是", "金钱"] },
      { sentence: "早起的鸟儿有虫吃", words: ["早起", "的", "鸟儿", "有", "虫", "吃"] },
    ],
    
     ar : [
      { sentence: "الثعلب البني السريع يقفز فوق الكلب الكسول", words: ["الثعلب", "البني", "السريع", "يقفز", "فوق", "الكلب", "الكسول"] },
      { sentence: "رحلة الألف ميل تبدأ بخطوة واحدة", words: ["رحلة", "الألف", "ميل", "تبدأ", "بخطوة", "واحدة"] },
      { sentence: "أن تكون أو لا تكون، هذه هي المسألة", words: ["أن", "تكون", "أو", "لا", "تكون", "هذه", "هي", "المسألة"] },
      { sentence: "ليس كل ما يلمع ذهبًا", words: ["ليس", "كل", "ما", "يومع", "ذهبًا"] },
      { sentence: "الأفعال أبلغ من الأقوال", words: ["الأفعال", "أبلغ", "من", "الأقوال"] },
      { sentence: "الحظ يفضل الجريئين", words: ["الحظ", "يفضل", "الجريئين"] },
      { sentence: "القلم أقوى من السيف", words: ["القلم", "أقوى", "من", "السيف"] },
      { sentence: "المعرفة قوة", words: ["المعرفة", "قوة"] },
      { sentence: "الوقت هو المال", words: ["الوقت", "هو", "المال"] },
      { sentence: "من يستيقظ مبكرًا، يساعده الله", words: ["من", "يستيقظ", "مبكرًا", "يساعدة", "الله"] },
    ],
    
     ko : [
      { sentence: "빠른 갈색 여우가 게으른 개를 넘습니다", words: ["빠른", "갈색", "여우", "가", "게으른", "개", "를", "넘습니다"] },
      { sentence: "천 리 길도 한 걸음부터", words: ["천", "리", "길", "도", "한", "걸음", "부터"] },
      { sentence: "살아야 할지 죽어야 할지, 그것이 문제로다", words: ["살아야", "할지", "죽어야", "할지", "그것이", "문제", "로다"] },
      { sentence: "반짝이는 모든 것이 금은 아니다", words: ["반짝이는", "모든", "것이", "금은", "아니다"] },
      { sentence: "행동이 말보다 더 강하다", words: ["행동이", "말보다", "더", "강하다"] },
      { sentence: "운명은 용감한 자를 돕는다", words: ["운명은", "용감한", "자를", "돕는다"] },
      { sentence: "펜은 검보다 강하다", words: ["펜은", "검보다", "강하다"] },
      { sentence: "지식은 힘이다", words: ["지식은", "힘이다"] },
      { sentence: "시간은 돈이다", words: ["시간은", "돈이다"] },
      { sentence: "일찍 일어나는 새가 먹이를 잡는다", words: ["일찍", "일어나는", "새가", "먹이를", "잡는다"] },
    ],
    
     nl : [
      { sentence: "De snelle bruine vos springt over de luie hond", words: ["De", "snelle", "bruine", "vos", "springt", "over", "de", "luie", "hond"] },
      { sentence: "Een reis van duizend mijlen begint met een enkele stap", words: ["Een", "reis", "van", "duizend", "mijlen", "begint", "met", "een", "enkele", "stap"] },
      { sentence: "Zijn of niet zijn, dat is de vraag", words: ["Zijn", "of", "niet", "zijn", "dat", "is", "de", "vraag"] },
      { sentence: "Alles wat glinstert is geen goud", words: ["Alles", "wat", "glinstert", "is", "geen", "goud"] },
      { sentence: "Acties spreken luider dan woorden", words: ["Acties", "spreken", "luider", "dan", "woorden"] },
      { sentence: "Het geluk begunstigt de dapperen", words: ["Het", "geluk", "begunstigt", "de", "dapperen"] },
      { sentence: "De pen is machtiger dan het zwaard", words: ["De", "pen", "is", "machtiger", "dan", "het", "zwaard"] },
      { sentence: "Kennis is macht", words: ["Kennis", "is", "macht"] },
      { sentence: "Tijd is geld", words: ["Tijd", "is", "geld"] },
      { sentence: "De vroege vogel vangt de worm", words: ["De", "vroege", "vogel", "vangt", "de", "worm"] },
    ],
    
     pl : [
      { sentence: "Szybki brązowy lis skacze ponad leniwym psem", words: ["Szybki", "brązowy", "lis", "skacze", "ponad", "leniwy", "psem"] },
      { sentence: "Podróż tysiąca mil zaczyna się od jednego kroku", words: ["Podróż", "tysiąca", "mil", "zaczyna", "się", "od", "jednego", "kroku"] },
      { sentence: "Być albo nie być, oto jest pytanie", words: ["Być", "albo", "nie", "być", "oto", "jest", "pytanie"] },
      { sentence: "Nie wszystko, co się świeci, jest złotem", words: ["Nie", "wszystko", "co", "się", "świeci", "jest", "złotem"] },
      { sentence: "Czyny mówią głośniej niż słowa", words: ["Czyny", "mówią", "głośniej", "niż", "słowa"] },
      { sentence: "Fortuna sprzyja odważnym", words: ["Fortuna", "sprzyja", "odważnym"] },
      { sentence: "Pióro jest potężniejsze niż miecz", words: ["Pióro", "jest", "potężniejsze", "niż", "miecz"] },
      { sentence: "Wiedza to potęga", words: ["Wiedza", "to", "potęga"] },
      { sentence: "Czas to pieniądz", words: ["Czas", "to", "pieniądz"] },
      { sentence: "Ranny ptaszek złapie robaczka", words: ["Ranny", "ptaszek", "złapie", "robaczka"] },
    ],
    
     sv : [
      { sentence: "Den snabba bruna räven hoppar över den lata hunden", words: ["Den", "snabba", "bruna", "räven", "hoppar", "över", "den", "lata", "hunden"] },
      { sentence: "En resa på tusen mil börjar med ett enda steg", words: ["En", "resa", "på", "tusen", "mil", "börjar", "med", "ett", "enda", "steg"] },
      { sentence: "Att vara eller inte vara, det är frågan", words: ["Att", "vara", "eller", "inte", "vara", "det", "är", "frågan"] },
      { sentence: "Allt som glimmar är inte guld", words: ["Allt", "som", "glimmar", "är", "inte", "guld"] },
      { sentence: "Handlingar talar högre än ord", words: ["Handlingar", "talar", "högre", "än", "ord"] },
      { sentence: "Turen gynnar de modiga", words: ["Turen", "gynnar", "de", "modiga"] },
      { sentence: "Pennan är mäktigare än svärdet", words: ["Pennan", "är", "mäktigare", "än", "svärdet"] },
      { sentence: "Kunskap är makt", words: ["Kunskap", "är", "makt"] },
      { sentence: "Tid är pengar", words: ["Tid", "är", "pengar"] },
      { sentence: "Den som är tidig på morgonen får en belöning", words: ["Den", "som", "är", "tidig", "på", "morgonen", "får", "en", "belöning"] },
    ],
    
  };
  