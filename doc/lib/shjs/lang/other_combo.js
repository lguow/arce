if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['changelog'] = [
  [
    {
      'next': 1,
      'regex': /[\d]{2,4}-?[\d]{2}-?[\d]{2}/g,
      'state': 1,
      'style': 'sh_date'
    },
    {
      'regex': /(^[ \t]+)(\*)([ \t]+)((?:[^:]+\:)?)/g,
      'style': ['sh_normal', 'sh_symbol', 'sh_normal', 'sh_file']
    },
    {
      'regex': /(^[ \t]+)((?:[^:]+\:)?)/g,
      'style': ['sh_normal', 'sh_file']
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:[A-Za-z0-9_]|[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-])+/g,
      'style': 'sh_name'
    }
  ]
];

sh_languages['cpp'] = [
  [
    {
      'next': 1,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 7,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /^[ \t]*#(?:[ \t]*include)/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 32,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 33,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|class|const|const_cast|continue|default|delete|do|dynamic_cast|else|enum|explicit|extern|false|for|friend|goto|if|inline|mutable|namespace|new|operator|pascal|private|protected|public|register|reinterpret_cast|return|sizeof|static|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|typename|union|using|virtual|volatile|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 2,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 5,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 3,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 6,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 9,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 12,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 13,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 16,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'next': 17,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 18,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 24,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 25,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 31,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 19,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 21,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 22,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 20,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 21,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 23,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 25,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 26,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 28,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 29,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 27,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 28,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 30,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 31,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ]
];

sh_languages['csharp'] = [
  [
    {
      'regex': /\b(?:using)\b/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))(?:[FfDdMmUulL]+)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 1,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 7,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /^[ \t]*#(?:[ \t]*include)/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 32,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 33,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:abstract|event|new|struct |as|explicit|null|switch|base|extern|this|false|operator|throw|break|finally|out|true|fixed|override|try|case|params|typeof|catch|for|private|foreach|protected|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|continue|in|return|virtual|default|interface|sealed|volatile|delegate|internal|do|is|sizeof|while|lock|stackalloc|else|static|enum|namespace|get|partial|set|value|where|yield)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 2,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 5,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 3,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 6,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 9,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 12,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 13,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 16,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'next': 17,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 18,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 24,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 25,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 31,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 19,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 21,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 22,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 20,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 21,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 23,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 25,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 26,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 28,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 29,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 27,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 28,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 30,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 31,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ]
];

sh_languages['diff'] = [
  [
    {
      'next': 1,
      'regex': /(?=^[-]{3})/g,
      'state': 1,
      'style': 'sh_oldfile'
    },
    {
      'next': 6,
      'regex': /(?=^[*]{3})/g,
      'state': 1,
      'style': 'sh_oldfile'
    },
    {
      'next': 14,
      'regex': /(?=^[\d])/g,
      'state': 1,
      'style': 'sh_difflines'
    }
  ],
  [
    {
      'next': 2,
      'regex': /^[-]{3}/g,
      'style': 'sh_oldfile'
    },
    {
      'next': 3,
      'regex': /^[-]/g,
      'style': 'sh_oldfile'
    },
    {
      'next': 4,
      'regex': /^[+]/g,
      'style': 'sh_newfile'
    },
    {
      'next': 5,
      'regex': /^@@/g,
      'style': 'sh_difflines'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'next': 7,
      'regex': /^[*]{3}[ \t]+[\d]/g,
      'style': 'sh_oldfile'
    },
    {
      'next': 9,
      'regex': /^[*]{3}/g,
      'style': 'sh_oldfile'
    },
    {
      'next': 10,
      'regex': /^[-]{3}[ \t]+[\d]/g,
      'style': 'sh_newfile'
    },
    {
      'next': 13,
      'regex': /^[-]{3}/g,
      'style': 'sh_newfile'
    }
  ],
  [
    {
      'next': 8,
      'regex': /^[\s]/g,
      'style': 'sh_normal'
    },
    {
      'exit': true,
      'regex': /(?=^[-]{3})/g,
      'style': 'sh_newfile'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'next': 11,
      'regex': /^[\s]/g,
      'style': 'sh_normal'
    },
    {
      'exit': true,
      'regex': /(?=^[*]{3})/g,
      'style': 'sh_newfile'
    },
    {
      'exit': true,
      'next': 12,
      'regex': /^diff/g,
      'style': 'sh_normal'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'next': 15,
      'regex': /^[\d]/g,
      'style': 'sh_difflines'
    },
    {
      'next': 16,
      'regex': /^[<]/g,
      'style': 'sh_oldfile'
    },
    {
      'next': 17,
      'regex': /^[>]/g,
      'style': 'sh_newfile'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ]
];

sh_languages['flex'] = [
  [
    {
      'next': 1,
      'regex': /^%\{/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 35,
      'regex': /^%[sx]/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 36,
      'regex': /^%option/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^%(?:array|pointer|[aceknopr])/g,
      'style': 'sh_preproc'
    },
    {
      'next': 38,
      'regex': /[A-Za-z_][A-Za-z0-9_-]*/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 40,
      'regex': /^%%/g,
      'state': 1,
      'style': 'sh_preproc'
    }
  ],
  [
    {
      'exit': true,
      'regex': /^%\}/g,
      'style': 'sh_preproc'
    },
    {
      'next': 2,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 9,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 16,
      'regex': /^[ \t]*#(?:[ \t]*include)/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 33,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 34,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|class|const|const_cast|continue|default|delete|do|dynamic_cast|else|enum|explicit|extern|false|for|friend|goto|if|inline|mutable|namespace|new|operator|pascal|private|protected|public|register|reinterpret_cast|return|sizeof|static|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|typename|union|using|virtual|volatile|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 3,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 5,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 6,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 4,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 5,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 7,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 9,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 10,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 12,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 13,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 11,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 14,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 17,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'next': 18,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 19,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 25,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 26,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 32,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 20,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 22,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 23,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 21,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 22,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 24,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 26,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 27,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 29,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 30,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 28,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 29,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 31,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 32,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /[A-Za-z_][A-Za-z0-9_-]*/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /[A-Za-z_][A-Za-z0-9_-]*/g,
      'style': 'sh_keyword'
    },
    {
      'next': 37,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\{[A-Za-z_][A-Za-z0-9_-]*\}/g,
      'style': 'sh_type'
    },
    {
      'next': 39,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'next': 41,
      'regex': /^%%/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /<[A-Za-z_][A-Za-z0-9_-]*>/g,
      'style': 'sh_function'
    },
    {
      'next': 75,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\{[A-Za-z_][A-Za-z0-9_-]*\}/g,
      'style': 'sh_type'
    },
    {
      'next': 76,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 77,
      'regex': /\{/g,
      'state': 1,
      'style': 'sh_cbracket'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    }
  ],
  [
    {
      'next': 42,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 48,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 49,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 55,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 56,
      'regex': /^[ \t]*#(?:[ \t]*include)/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 73,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 74,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|class|const|const_cast|continue|default|delete|do|dynamic_cast|else|enum|explicit|extern|false|for|friend|goto|if|inline|mutable|namespace|new|operator|pascal|private|protected|public|register|reinterpret_cast|return|sizeof|static|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|typename|union|using|virtual|volatile|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 43,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 45,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 46,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 44,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 45,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 47,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 49,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 50,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 52,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 53,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 51,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 52,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 54,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 55,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 57,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'next': 58,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 59,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 65,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 66,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 72,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 60,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 62,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 63,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 61,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 62,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 64,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 66,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 67,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 69,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 70,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 68,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 69,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 71,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 72,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 76,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\}/g,
      'style': 'sh_cbracket'
    },
    {
      'next': 77,
      'regex': /\{/g,
      'state': 1,
      'style': 'sh_cbracket'
    },
    {
      'regex': /\$./g,
      'style': 'sh_variable'
    },
    {
      'next': 78,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 84,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 85,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 91,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 92,
      'regex': /^[ \t]*#(?:[ \t]*include)/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'regex': /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 109,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 110,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|class|const|const_cast|continue|default|delete|do|dynamic_cast|else|enum|explicit|extern|false|for|friend|goto|if|inline|mutable|namespace|new|operator|pascal|private|protected|public|register|reinterpret_cast|return|sizeof|static|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|typename|union|using|virtual|volatile|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 79,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 81,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 82,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 80,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 81,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 83,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 85,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 86,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 88,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 89,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 87,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 88,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 90,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 91,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 93,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'next': 94,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 95,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 101,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 102,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 108,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 96,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 98,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 99,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 97,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 98,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 100,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 102,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 103,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 105,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 106,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 104,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 105,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 107,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 108,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ]
];

sh_languages['java'] = [
  [
    {
      'regex': /\b(?:import|package)\b/g,
      'style': 'sh_preproc'
    },
    {
      'next': 1,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 7,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 15,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 16,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /(\b(?:class|interface))([ \t]+)([$A-Za-z0-9]+)/g,
      'style': ['sh_keyword', 'sh_normal', 'sh_type']
    },
    {
      'regex': /\b(?:abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|false|final|finally|for|goto|if|implements|instanceof|interface)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:native|new|null|private|protected|public|return|static|strictfp|super|switch|synchronized|throw|throws|true|this|transient|try|volatile|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 2,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 5,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 3,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 4,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 6,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 9,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 12,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 13,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 14,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ]
];

sh_languages['log'] = [
  [
    {
      'next': 1,
      'regex': /^[A-Za-z]{3}[ \t]{1,2}[\d]{1,2}(?=[ \t][\d]{2}:[\d]{2}:[\d]{2})/g,
      'state': 1,
      'style': 'sh_date'
    },
    {
      'next': 6,
      'regex': /^[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\b/g,
      'state': 1,
      'style': 'sh_ip'
    },
    {
      'next': 8,
      'regex': /^\[[A-Za-z]{3}[ \t][A-Za-z]{3}[ \t]{1,2}[\d]{1,2}[ \t](?=[\d]{2}:[\d]{2}:[\d]{2})/g,
      'state': 1,
      'style': 'sh_date'
    },
    {
      'regex': /[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\b/g,
      'style': 'sh_ip'
    },
    {
      'regex': /\b(?:root|failure)\b/g,
      'style': 'sh_string'
    },
    {
      'regex': /((?:port|pid)[ \t])([\d]+)/g,
      'style': ['sh_normal', 'sh_port']
    },
    {
      'next': 9,
      'regex': /[ \t](?=(?:IN|OUT)=)/g,
      'state': 1,
      'style': 'sh_normal'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 2,
      'regex': /\b[\d]{2}:[\d]{2}:[\d]{2}\b/g,
      'state': 1,
      'style': 'sh_time'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 3,
      'regex': /[^ \t]+/g,
      'state': 1,
      'style': 'sh_symbol'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exitall': true,
      'regex': /:/g,
      'style': 'sh_normal'
    },
    {
      'regex': /[^:\(\[]+/g,
      'style': 'sh_function'
    },
    {
      'next': 4,
      'regex': /\[/g,
      'style': 'sh_number'
    },
    {
      'next': 5,
      'regex': /\(/g,
      'style': 'sh_number'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': /\]/g,
      'style': 'sh_number'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': /\)/g,
      'style': 'sh_number'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /[A-Za-z0-9]+(?=[ \t]\[[\d]{2}\/[A-Za-z]{3}\/[\d]{4})/g,
      'style': 'sh_string'
    },
    {
      'regex': /[\d]{2}\/[A-Za-z]{3}\/[\d]{4}(?=:[\d]{2}:[\d]{2}:[\d]{2})/g,
      'style': 'sh_date'
    },
    {
      'regex': /[\d]{2}:[\d]{2}:[\d]{2}[ \t][+-][\d]{4}/g,
      'style': 'sh_time'
    },
    {
      'regex': /[1-5][\d]{2}[ \t][-0-9]+/g,
      'style': 'sh_twonumbers'
    },
    {
      'next': 7,
      'regex': /\b(?:OPTIONS|GET|HEAD|POST|PUT|DELETE|TRACE|CONNECT|PROPFIND|MKCOL|COPY|MOVE|LOCK|UNLOCK)\b/g,
      'state': 1,
      'style': 'sh_webmethod'
    }
  ],
  [
    {
      'exit': true,
      'regex': /[^ \t]+/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\b[\d]{2}:[\d]{2}:[\d]{2}\b/g,
      'style': 'sh_time'
    },
    {
      'regex': /[\d]{4}\]/g,
      'style': 'sh_date'
    },
    {
      'regex': /\[[A-Za-z]{3}[ \t][A-Za-z]{3}[ \t]{1,2}[\d]{1,2}[ \t](?=[\d]{2}:[\d]{2}:[\d]{2})/g,
      'style': 'sh_date'
    },
    {
      'regex': /\[error\]/g,
      'style': 'sh_string'
    },
    {
      'regex': /\[notice\]/g,
      'style': 'sh_comment'
    },
    {
      'regex': /[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\b/g,
      'style': 'sh_ip'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'next': 10,
      'regex': /(?:IN|OUT|PROTO)=(?=[^ \t]+)/g,
      'state': 1,
      'style': 'sh_normal'
    },
    {
      'next': 11,
      'regex': /(?:SPT|DPT|TYPE|SEQ)=(?=[^ \t]+)/g,
      'state': 1,
      'style': 'sh_normal'
    },
    {
      'regex': /\b(?:CWR|ECE|URG|ACK|PSH|RST|SYN|FIN)\b/g,
      'style': 'sh_number'
    },
    {
      'regex': /[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\b/g,
      'style': 'sh_ip'
    }
  ],
  [
    {
      'exit': true,
      'regex': /[^ \t]+/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /[^ \t]+/g,
      'style': 'sh_cbracket'
    }
  ]
];

sh_languages['makefile'] = [
  [
    {
      'regex': /^[a-zA-Z0-9_-]+[\s]*=/g,
      'style': 'sh_type'
    },
    {
      'regex': /^\.[a-zA-Z0-9_-]+[\s]*:/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@(?:.+)@/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /^(?:[A-Za-z0-9_.\s-])+:/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /%[a-zA-Z0-9_.-]+:%[a-zA-Z0-9_.-]+/g,
      'style': 'sh_string'
    },
    {
      'regex': /(?:[A-Za-z0-9_-]*)\.(?:[A-Za-z0-9_-]+)/g,
      'style': 'sh_normal'
    },
    {
      'regex': /\b(?:import)\b/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'regex': /\\"/g,
      'style': 'sh_normal'
    },
    {
      'regex': /\\'/g,
      'style': 'sh_normal'
    },
    {
      'next': 1,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 2,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /function[ \t]+(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?:\(\))?/g,
      'style': 'sh_function'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*\(\)/g,
      'style': 'sh_function'
    },
    {
      'regex': /(?:[A-Za-z]*[-\/]+[A-Za-z]+)+/g,
      'style': 'sh_normal'
    },
    {
      'regex': /\b(?:alias|bg|bind|break|builtin|caller|case|command|compgen|complete|continue|declare|dirs|disown|do|done|elif|else|enable|esac|eval|exec|exit|export|false|fc|fg|fi|for|getopts|hash|help|history|if|in|jobs|let|local|logout|popd|printf|pushd|read|readonly|return|select|set|shift|shopt|source|suspend|test|then|times|trap|true|type|typeset|umask|unalias|unset|until|wait|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*(?==)/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$\{(?:[^ \t]+)\}/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$\((?:[^ \t]+)\)/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$(?:[A-Za-z]|_)[A-Za-z0-9_]*/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$(?:[^ \t]{1})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||(?:##){2}|%%/g,
      'style': 'sh_symbol'
    },
    {
      'next': 3,
      'regex': /#/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ]
];

sh_languages['perl'] = [
  [
    {
      'regex': /\b(?:import)\b/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /s\{(?:\\\}|[^}])*\}\{(?:\\\}|[^}])*\}[ixsmogce]*/g,
      'style': 'sh_regexp'
    },
    {
      'regex': /s\((?:\\\)|[^)])*\)\((?:\\\)|[^)])*\)[ixsmogce]*/g,
      'style': 'sh_regexp'
    },
    {
      'regex': /s\[(?:\\\]|[^\]])*\]\[(?:\\\]|[^\]])*\][ixsmogce]*/g,
      'style': 'sh_regexp'
    },
    {
      'regex': /s<.*><.*>[ixsmogce]*/g,
      'style': 'sh_regexp'
    },
    {
      'regex': /s([^A-Za-z0-9 \t]).*\1.*\1[ixsmogce]*(?=[ \t]*(\)|;))/g,
      'style': 'sh_regexp'
    },
    {
      'regex': /s([^A-Za-z0-9 \t]).*\1[ \t]*([^A-Za-z0-9 \t]).*\2[ixsmogce]*(?=[ \t]*(\)|;))/g,
      'style': 'sh_regexp'
    },
    {
      'next': 1,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 2,
      'regex': /(?:m|qr)(?=\{)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 4,
      'regex': /(?:m|qr)(?=#)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 6,
      'regex': /(?:m|qr)(?=\|)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 8,
      'regex': /(?:m|qr)(?=@)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 10,
      'regex': /(?:m|qr)(?=<)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 12,
      'regex': /(?:m|qr)(?=\[)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 14,
      'regex': /(?:m|qr)(?=\\)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 16,
      'regex': /(?:m|qr)(?=\/)/g,
      'style': 'sh_keyword'
    },
    {
      'next': 18,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 19,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'next': 20,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'regex': /[A-Za-z0-9_]*\/[^\n]*\/[A-Za-z0-9_]*/g,
      'style': 'sh_string'
    },
    {
      'regex': /\b(?:chomp|chop|chr|crypt|hex|i|index|lc|lcfirst|length|oct|ord|pack|q|qq|reverse|rindex|sprintf|substr|tr|uc|ucfirst|m|s|g|qw|abs|atan2|cos|exp|hex|int|log|oct|rand|sin|sqrt|srand|my|local|our|delete|each|exists|keys|values|pack|read|syscall|sysread|syswrite|unpack|vec|undef|unless|return|length|grep|sort|caller|continue|dump|eval|exit|goto|last|next|redo|sub|wantarray|pop|push|shift|splice|unshift|split|switch|join|defined|foreach|last|chop|chomp|bless|dbmclose|dbmopen|ref|tie|tied|untie|while|next|map|eq|die|cmp|lc|uc|and|do|if|else|elsif|for|use|require|package|import|chdir|chmod|chown|chroot|fcntl|glob|ioctl|link|lstat|mkdir|open|opendir|readlink|rename|rmdir|stat|symlink|umask|unlink|utime|binmode|close|closedir|dbmclose|dbmopen|die|eof|fileno|flock|format|getc|print|printf|read|readdir|rewinddir|seek|seekdir|select|syscall|sysread|sysseek|syswrite|tell|telldir|truncate|warn|write|alarm|exec|fork|getpgrp|getppid|getpriority|kill|pipe|qx|setpgrp|setpriority|sleep|system|times|x|wait|waitpid)\b/g,
      'style': 'sh_keyword'
    },
    {
      'next': 21,
      'regex': /^\=(?:head1|head2|item)/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:\$[#]?|@|%)[\/A-Za-z0-9_]+/g,
      'style': 'sh_variable'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'next': 3,
      'regex': /\{/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\\{|\\\}/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /\}/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 5,
      'regex': /#/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\#/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /#/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 7,
      'regex': /\|/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\\|/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /\|/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 9,
      'regex': /@/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\@/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /@/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 11,
      'regex': /</g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\<|\\>/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': />/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 13,
      'regex': /\[/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\]/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /\]/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 15,
      'regex': /\\/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\\\/g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /\\/g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'next': 17,
      'regex': /\//g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'regex': /[ \t]+#.*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\\\//g,
      'style': 'sh_regexp'
    },
    {
      'exitall': true,
      'regex': /\//g,
      'style': 'sh_regexp'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|')/g
    },
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\=cut/g,
      'style': 'sh_comment'
    }
  ]
];

sh_languages['php'] = [
  [
    {
      'regex': /\b(?:include|include_once|require|require_once)\b/g,
      'style': 'sh_preproc'
    },
    {
      'next': 1,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 2,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 3,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 4,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g,
      'style': 'sh_keyword'
    },
    {
      'next': 5,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 18,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<\?php/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    },
    {
      'regex': /\$?[A-Za-z_][A-Za-z0-9_]*/g,
      'style': 'sh_variable'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|')/g
    },
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 6,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 9,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 7,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 13,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 16,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 14,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 17,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 18,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ]
];

sh_languages['python'] = [
  [
    {
      'regex': /\b(?:import|from)\b/g,
      'style': 'sh_preproc'
    },
    {
      'next': 1,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'regex': /\b(?:and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|global|if|in|is|lambda|not|or|pass|print|raise|return|try|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'next': 2,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 3,
      'regex': /^(?:[\s]*'{3})/g,
      'style': 'sh_comment'
    },
    {
      'next': 4,
      'regex': /^(?:[\s]*\"{3})/g,
      'style': 'sh_comment'
    },
    {
      'regex': /^(?:[\s]*'(?:[^\\']|\\.)*'[\s]*|[\s]*\"(?:[^\\\"]|\\.)*\"[\s]*)$/g,
      'style': 'sh_comment'
    },
    {
      'next': 5,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 6,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'next': 7,
      'regex': /(?:[\s]*'{3})/g,
      'style': 'sh_string'
    },
    {
      'next': 8,
      'regex': /(?:[\s]*\"{3})/g,
      'style': 'sh_string'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    },
    {
      'regex': /[A-Za-z_][A-Za-z0-9_]*/g,
      'style': 'sh_variable'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 2,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:'{3})/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\"{3})/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|')/g
    },
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:'{3})/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\"{3})/g,
      'style': 'sh_string'
    }
  ]
];

sh_languages['ruby'] = [
  [
    {
      'regex': /\b(?:require)\b/g,
      'style': 'sh_preproc'
    },
    {
      'next': 1,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 2,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 3,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'next': 4,
      'regex': /</g,
      'style': 'sh_string'
    },
    {
      'regex': /\/[^\n]*\//g,
      'style': 'sh_regexp'
    },
    {
      'regex': /(%r)(\{(?:\\\}|#\{[A-Za-z0-9]+\}|[^}])*\})/g,
      'style': ['sh_symbol', 'sh_regexp']
    },
    {
      'regex': /\b(?:alias|begin|BEGIN|break|case|defined|do|else|elsif|end|END|ensure|for|if|in|include|loop|next|raise|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|false|nil|self|true|__FILE__|__LINE__|and|not|or|def|class|module|catch|fail|load|throw)\b/g,
      'style': 'sh_keyword'
    },
    {
      'next': 5,
      'regex': /(?:^\=begin)/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:\$[#]?|@@|@)(?:[A-Za-z0-9_]+|'|\"|\/)/g,
      'style': 'sh_type'
    },
    {
      'regex': /[A-Za-z0-9]+(?:\?|!)/g,
      'style': 'sh_normal'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /(#)(\{)/g,
      'style': ['sh_symbol', 'sh_cbracket']
    },
    {
      'regex': /\{|\}/g,
      'style': 'sh_cbracket'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /\\(?:\\|')/g
    },
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /^(?:\=end)/g,
      'style': 'sh_comment'
    }
  ]
];

sh_languages['sh'] = [
  [
    {
      'regex': /\b(?:import)\b/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'regex': /\\"/g,
      'style': 'sh_normal'
    },
    {
      'regex': /\\'/g,
      'style': 'sh_normal'
    },
    {
      'next': 1,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 2,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /function[ \t]+(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?:\(\))?/g,
      'style': 'sh_function'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*\(\)/g,
      'style': 'sh_function'
    },
    {
      'regex': /(?:[A-Za-z]*[-\/]+[A-Za-z]+)+/g,
      'style': 'sh_normal'
    },
    {
      'regex': /\b(?:alias|bg|bind|break|builtin|caller|case|command|compgen|complete|continue|declare|dirs|disown|do|done|elif|else|enable|esac|eval|exec|exit|export|false|fc|fg|fi|for|getopts|hash|help|history|if|in|jobs|let|local|logout|popd|printf|pushd|read|readonly|return|select|set|shift|shopt|source|suspend|test|then|times|trap|true|type|typeset|umask|unalias|unset|until|wait|while)\b/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*(?==)/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$\{(?:[^ \t]+)\}/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$\((?:[^ \t]+)\)/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$(?:[A-Za-z]|_)[A-Za-z0-9_]*/g,
      'style': 'sh_variable'
    },
    {
      'regex': /\$(?:[^ \t]{1})/g,
      'style': 'sh_variable'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||(?:##){2}|%%/g,
      'style': 'sh_symbol'
    },
    {
      'next': 3,
      'regex': /#/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ]
];

sh_languages['sql'] = [
  [
    {
      'regex': /\b(?:[Vv][Aa][Rr][Cc][Hh][Aa][Rr]|[Tt][Ii][Nn][Yy][Ii][Nn][Tt]|[Tt][Ee][Xx][Tt]|[Dd][Aa][Tt][Ee]|[Ss][Mm][Aa][Ll][Ll][Ii][Nn][Tt]|[Mm][Ee][Dd][Ii][Uu][Mm][Ii][Nn][Tt]|[Ii][Nn][Tt]|[Bb][Ii][Gg][Ii][Nn][Tt]|[Ff][Ll][Oo][Aa][Tt]|[Dd][Oo][Uu][Bb][Ll][Ee]|[Dd][Ee][Cc][Ii][Mm][Aa][Ll]|[Dd][Aa][Tt][Ee][Tt][Ii][Mm][Ee]|[Tt][Ii][Mm][Ee][Ss][Tt][Aa][Mm][Pp]|[Tt][Ii][Mm][Ee]|[Yy][Ee][Aa][Rr]|[Uu][Nn][Ss][Ii][Gg][Nn][Ee][Dd]|[Cc][Hh][Aa][Rr]|[Tt][Ii][Nn][Yy][Bb][Ll][Oo][Bb]|[Tt][Ii][Nn][Yy][Tt][Ee][Xx][Tt]|[Bb][Ll][Oo][Bb]|[Mm][Ee][Dd][Ii][Uu][Mm][Bb][Ll][Oo][Bb]|[Mm][Ee][Dd][Ii][Uu][Mm][Tt][Ee][Xx][Tt]|[Ll][Oo][Nn][Gg][Bb][Ll][Oo][Bb]|[Ll][Oo][Nn][Gg][Tt][Ee][Xx][Tt]|[Ee][Nn][Uu][Mm]|[Bb][Oo][Oo][Ll]|[Bb][Ii][Nn][Aa][Rr][Yy]|[Vv][Aa][Rr][Bb][Ii][Nn][Aa][Rr][Yy])\b/g,
      'style': 'sh_type'
    },
    {
      'regex': /\b(?:[Aa][Ll][Ll]|[Aa][Ss][Cc]|[Aa][Ss]|[Aa][Ll][Tt][Ee][Rr]|[Aa][Nn][Dd]|[Aa][Dd][Dd]|[Aa][Uu][Tt][Oo]_[Ii][Nn][Cc][Rr][Ee][Mm][Ee][Nn][Tt]|[Bb][Ee][Tt][Ww][Ee][Ee][Nn]|[Bb][Ii][Nn][Aa][Rr][Yy]|[Bb][Oo][Tt][Hh]|[Bb][Yy]|[Bb][Oo][Oo][Ll][Ee][Aa][Nn]|[Cc][Hh][Aa][Nn][Gg][Ee]|[Cc][Hh][Ee][Cc][Kk]|[Cc][Oo][Ll][Uu][Mm][Nn][Ss]|[Cc][Oo][Ll][Uu][Mm][Nn]|[Cc][Rr][Oo][Ss][Ss]|[Cc][Rr][Ee][Aa][Tt][Ee]|[Dd][Aa][Tt][Aa][Bb][Aa][Ss][Ee][Ss]|[Dd][Aa][Tt][Aa][Bb][Aa][Ss][Ee]|[Dd][Aa][Tt][Aa]|[Dd][Ee][Ll][Aa][Yy][Ee][Dd]|[Dd][Ee][Ss][Cc][Rr][Ii][Bb][Ee]|[Dd][Ee][Ss][Cc]|[Dd][Ii][Ss][Tt][Ii][Nn][Cc][Tt]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Rr][Oo][Pp]|[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ee][Nn][Cc][Ll][Oo][Ss][Ee][Dd]|[Ee][Ss][Cc][Aa][Pp][Ee][Dd]|[Ee][Xx][Ii][Ss][Tt][Ss]|[Ee][Xx][Pp][Ll][Aa][Ii][Nn]|[Ff][Ii][Ee][Ll][Dd][Ss]|[Ff][Ii][Ee][Ll][Dd]|[Ff][Ll][Uu][Ss][Hh]|[Ff][Oo][Rr]|[Ff][Oo][Rr][Ee][Ii][Gg][Nn]|[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn]|[Ff][Rr][Oo][Mm]|[Gg][Rr][Oo][Uu][Pp]|[Gg][Rr][Aa][Nn][Tt]|[Hh][Aa][Vv][Ii][Nn][Gg]|[Ii][Gg][Nn][Oo][Rr][Ee]|[Ii][Nn][Dd][Ee][Xx]|[Ii][Nn][Ff][Ii][Ll][Ee]|[Ii][Nn][Ss][Ee][Rr][Tt]|[Ii][Nn][Nn][Ee][Rr]|[Ii][Nn][Tt][Oo]|[Ii][Dd][Ee][Nn][Tt][Ii][Ff][Ii][Ee][Dd]|[Ii][Nn]|[Ii][Ss]|[Ii][Ff]|[Jj][Oo][Ii][Nn]|[Kk][Ee][Yy][Ss]|[Kk][Ii][Ll][Ll]|[Kk][Ee][Yy]|[Ll][Ee][Aa][Dd][Ii][Nn][Gg]|[Ll][Ii][Kk][Ee]|[Ll][Ii][Mm][Ii][Tt]|[Ll][Ii][Nn][Ee][Ss]|[Ll][Oo][Aa][Dd]|[Ll][Oo][Cc][Aa][Ll]|[Ll][Oo][Cc][Kk]|[Ll][Oo][Ww]_[Pp][Rr][Ii][Oo][Rr][Ii][Tt][Yy]|[Ll][Ee][Ff][Tt]|[Ll][Aa][Nn][Gg][Uu][Aa][Gg][Ee]|[Mm][Oo][Dd][Ii][Ff][Yy]|[Nn][Aa][Tt][Uu][Rr][Aa][Ll]|[Nn][Oo][Tt]|[Nn][Uu][Ll][Ll]|[Nn][Ee][Xx][Tt][Vv][Aa][Ll]|[Oo][Pp][Tt][Ii][Mm][Ii][Zz][Ee]|[Oo][Pp][Tt][Ii][Oo][Nn]|[Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll][Ll][Yy]|[Oo][Rr][Dd][Ee][Rr]|[Oo][Uu][Tt][Ff][Ii][Ll][Ee]|[Oo][Rr]|[Oo][Uu][Tt][Ee][Rr]|[Oo][Nn]|[Pp][Rr][Oo][Cc][Ee][Ee][Dd][Uu][Rr][Ee]|[Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Aa][Ll]|[Pp][Rr][Ii][Mm][Aa][Rr][Yy]|[Rr][Ee][Aa][Dd]|[Rr][Ee][Ff][Ee][Rr][Ee][Nn][Cc][Ee][Ss]|[Rr][Ee][Gg][Ee][Xx][Pp]|[Rr][Ee][Nn][Aa][Mm][Ee]|[Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Rr][Ee][Tt][Uu][Rr][Nn]|[Rr][Ee][Vv][Oo][Kk][Ee]|[Rr][Ll][Ii][Kk][Ee]|[Rr][Ii][Gg][Hh][Tt]|[Ss][Hh][Oo][Ww]|[Ss][Oo][Nn][Aa][Mm][Ee]|[Ss][Tt][Aa][Tt][Uu][Ss]|[Ss][Tt][Rr][Aa][Ii][Gg][Hh][Tt]_[Jj][Oo][Ii][Nn]|[Ss][Ee][Ll][Ee][Cc][Tt]|[Ss][Ee][Tt][Vv][Aa][Ll]|[Ss][Ee][Tt]|[Tt][Aa][Bb][Ll][Ee][Ss]|[Tt][Ee][Mm][Ii][Nn][Aa][Tt][Ee][Dd]|[Tt][Oo]|[Tt][Rr][Aa][Ii][Ll][Ii][Nn][Gg]|[Tt][Rr][Uu][Nn][Cc][Aa][Tt][Ee]|[Tt][Aa][Bb][Ll][Ee]|[Tt][Ee][Mm][Pp][Oo][Rr][Aa][Rr][Yy]|[Tt][Rr][Ii][Gg][Gg][Ee][Rr]|[Tt][Rr][Uu][Ss][Tt][Ee][Dd]|[Uu][Nn][Ii][Qq][Uu][Ee]|[Uu][Nn][Ll][Oo][Cc][Kk]|[Uu][Ss][Ee]|[Uu][Ss][Ii][Nn][Gg]|[Uu][Pp][Dd][Aa][Tt][Ee]|[Vv][Aa][Ll][Uu][Ee][Ss]|[Vv][Aa][Rr][Ii][Aa][Bb][Ll][Ee][Ss]|[Vv][Ii][Ee][Ww]|[Ww][Ii][Tt][Hh]|[Ww][Rr][Ii][Tt][Ee]|[Ww][Hh][Ee][Rr][Ee]|[Zz][Ee][Rr][Oo][Ff][Ii][Ll][Ll]|[Tt][Yy][Pp][Ee]|[Xx][Oo][Rr])\b/g,
      'style': 'sh_keyword'
    },
    {
      'next': 1,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 2,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'next': 3,
      'regex': /`/g,
      'style': 'sh_string'
    },
    {
      'next': 4,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'next': 5,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 18,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 19,
      'regex': /--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /`/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 6,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 9,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 7,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 13,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 16,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 14,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 17,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'next': 18,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ]
];
