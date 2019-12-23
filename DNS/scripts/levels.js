'use strict';

export function getLevels() {
	return [
        {
            "id": 0,
            "traits": ["a", "b"],
            "populations":
                [{
                    "combative": ["a"],
                    "docile": ["b"]
                },
                {
                    "combative": ["b"],
                    "docile": []
                }],
            "query":
                [{
                    "combative": ["a", "b"],
                    "docile": []
                }],
            "min": 4,
            "tutorials": ["a1", "a2", "a3"]
        },
        {
            "id": 1,
            "traits": ["a", "b", "c", "d"],
            "populations":
                [{
                    "combative": ["a"],
                    "docile": ["b"]
                },
                {
                    "combative": ["b"],
                    "docile": ["c"]
                },
                {
                    "combative": ["d"],
                    "docile": ["b"]
                }],
            "query":
                [{
                    "combative": ["a", "b" , "d"],
                    "docile": ["c"]
                }],
            "min": 24,
            "tutorials": ["b1", "b2", "b3"]
        },
        {
            "id": 2,
            "traits": ["a", "b", "c"],
            "populations":
                [{
                    "combative": ["a"],
                    "docile": ["b"]
                },
                {
					"combative": ["b"],
                    "docile": []
                },
                {
                    "combative": ["c"],
                    "docile": ["b"]
                }],
            "query":
                [{
                    "combative": ["a", "b"],
                    "docile": []
                },
                {

                    "combative": ["c"],
                    "docile": ["b"]
                }
                ],
                "min": 4,
                "tutorials": ["c1"]
        },
        {
            "id": 3,
            "traits": ["a", "b", "c", "d", "e", "f"],
            "populations":
                [{
                    "combative": ["a"],
                    "docile": ["b"]
                },
                {
                    "combative": ["b"],
                    "docile": []
                },
                {
                    "combative": ["c"],
                    "docile": ["d"]
                },
                {
                    "combative": ["d"],
                    "docile": []
                },
                {
                    "combative": ["e"],
                    "docile": ["f"]
                },
                {
                    "combative": ["f"],
                    "docile": []
                }],
            "query":
                [{
                    "combative": ["a", "b"],
                    "docile": []
                },
                {
                    "combative": ["e", "f"],
                    "docile": []
                },
                {
                    "combative": ["c"],
                    "docile": ["d"]
                },
                {
                    "combative": ["d"],
                    "docile": []
                }
                ],
                "min": 8,
                "tutorials": ["h"]
        },
        {
            "id": 4,
            "traits": ["a", "b", "c"],
            "populations":
                [{
                    "combative": ["a", "b"],
                    "docile": []
                },
                {
                    "combative": ["a"],
                    "docile": []
                },                
                {
                    "combative": ["a"],
                    "docile": ["b"]
                }, 
                {
                    "combative": ["a"],
                    "docile": ["c"]
                },
                {
                    "combative": ["b"],
                    "docile": []
                }],
            "query":
                [{
                    "combative": ["b"],
                    "docile": ["a"]
                },
                {
                    "combative": ["a"],
                    "docile": ["b"]
                },
                {
                    "combative": ["a", "b"],
                    "docile": ["c"]
                }],
                "min": 12,
                "tutorials": []
        },
        {
            "id": 5,
            "traits": ["a", "b", "c"],
            "populations":
                [{
                    "combative": ["a", "b"],
                    "docile": []
                },
                {
                    "combative": ["a"],
                    "docile": []
                },                
                {
                    "combative": ["a"],
                    "docile": ["b"]
                }, 
                {
                    "combative": ["a"],
                    "docile": ["c"]
                },                
                {
                    "combative": ["c"],
                    "docile": []
                },                
                {
                    "combative": ["b", "c"],
                    "docile": []
                },
                {
                    "combative": ["b"],
                    "docile": []
                }],
            "query":
                [{
                    "combative": ["a", "b"],
                    "docile": ["c"]
                },
                {
                    "combative": ["b"],
                    "docile": ["a"]
                },
                {
                    "combative": ["a", "b"],
                    "docile": [ "c"]
                }],
                "min": 24,
                "tutorials": []
        },
        {
	            "id": 6,
	            "traits": ["a", "b", "c", "d"],
	            "populations":
	                [{
	                    "combative": ["a"],
	                    "docile": ["c"]
	                },
	                {
	                    "combative": ["c"],
	                    "docile": []
	                },
	                {
	                    "combative": ["b"],
	                    "docile": ["a"]
	                },
	                {
	                    "combative": ["d"],
	                    "docile": ["a", "c", "b"]
	                }],
	            "query":
	                [{
	                    "combative": ["a", "b", "c", "d"],
	                    "docile": []
	                }],
	            "min": 28,
	            "tutorials": ["d1"]
        },
	    {
	            "id": 7,
	            "traits": ["a", "b", "c", "d", "e", "f"],
	            "populations":
	                [{
	                    "combative": ["a"],
	                    "docile": []
	                },
	                {
	                    "combative": ["b"],
	                    "docile": []
	                },
	                {
	                    "combative": ["c"],
	                    "docile": ["a", "b"]
	                },
	                {
	                    "combative": ["d"],
	                    "docile": []
	                },
	                {
	                    "combative": ["e"],
	                    "docile": ["c", "d"]
	                },
	                {
	                    "combative": ["f"],
	                    "docile": ["e"]
	                }],
	            "query":
	                [{
	                    "combative": ["a", "b", "c", "d", "e", "f"],
	                    "docile": []
	                }],
	            "min": 100,
	            "tutorials": ["h"]
        },
        {
	            "id": 8,
	            "traits": ["a", "b", "c"],
	            "populations":
	                [{
	                    "combative": ["a", "b"],
	                    "docile": ["c"]
	                }],
	            "query":
	                [{
	                    "combative": ["a", "b"],
	                    "docile": ["c"]
	                },
	                {
	                    "combative": ["a"],
	                    "docile": ["c"]
	                }
	                ],
	                "min": 0,
	                "tutorials": ["e1", "e2"]
        },
        {
	            "id": 9,
	            "traits": ["a", "b", "c"],
	            "populations":
	                [{
	                    "combative": ["a"],
	                    "docile": ["b"]
	                },
	                {
	                    "combative": ["b"],
	                    "docile": ["c"]
	                }],
	            "query":
	                [{
	                    "combative": ["a"],
	                    "docile": ["c"]
	                },
                    {
                        "combative": ["a","b"],
                        "docile": ["c"]
                    }],
	                "min": 8,
	                "tutorials": ["h"]
        },
        {
	            "id": 10,
	            "traits": ["a", "b", "c"],
	            "populations":
	                [{
	                    "combative": ["a"],
	                    "docile": ["b"]
	                },
	                {
	                    "combative": ["c"],
	                    "docile": ["b"]
	                },
	                {
	                    "combative": ["b"],
	                    "docile": []
	                }],
	            "query":
	                [{
	                    "combative": ["c", "b"],
	                    "docile": []
	                }],
	                "min": 4,
	                "tutorials": ["f1"]
        },
        {
                "id": 11,
                "traits": ["a", "b", "c"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": ["b"]
                    },
                    {
                        "combative": ["c"],
                        "docile": ["b"]
                    },
                    {
                        "combative": ["b"],
                        "docile": []
                    }],
                "query":
                    [{
                        "combative": ["c"],
                        "docile": []
                    }],
                    "min": 4,
                    "tutorials": ["h"]
            },
            // BN without tears (modified)
            {
                "id": 12,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["d", "i"],
                        "docile": []
                    }],
                    "min": 4,
                    "tutorials": ["g1"]
            },
            {
                "id": 13,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["s"],
                        "docile": ["d"]
                    }],
                    "min": 12,
                    "tutorials": []
            },
            {
                "id": 14,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["l"],
                        "docile": ["s"]
                    }],
                    "min": 32,
                    "tutorials": []
            },
            {
                "id": 15,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["x"],
                        "docile": ["s"]
                    }],
                    "min": 16,
                    "tutorials": []
            },
            {
                "id": 16,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["x", "s"],
                        "docile": ["l"]
                    }],
                    "min": 68,
                    "tutorials": []
            },
            {
                "id": 17,
                "traits": ["d", "g", "i", "s", "l","x"],
                "populations":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["g"],
                        "docile": ["d", "i"]
                    },
                    {
                        "combative": ["i"],
                        "docile": []
                    },
                    {
                        "combative": ["s"],
                        "docile": ["i"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["g"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["d"]
                    }],
                "query":
                    [{
                        "combative": ["l", "s"],
                        "docile": ["x"]
                    },
                    {
                        "combative": ["l"],
                        "docile": ["x"]
                    }],
                    "min": 64,
                    "tutorials": []
            },
            // Asia
            {
                "id": 18,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["e"],
                        "docile": ["t"]
                    }],
                    "min": 12,
                    "tutorials": []
            },
            {
                "id": 19,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["l"],
                        "docile": ["b","e"]
                    }],
                    "min": 44,
                    "tutorials": []
            },
            {
                "id": 20,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["d"],
                        "docile": []
                    },
                    {
                        "combative": ["x"],
                        "docile": []
                    }],
                    "min": 44,
                    "tutorials": []
            },
            {
                "id": 21,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["s"],
                        "docile": ["b", "d", "t"]
                    }],
                    "min": 80,
                    "tutorials": []
            },
            {
                "id": 22,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["s"],
                        "docile": ["l"]
                    },
                    {
                        "combative": ["d"],
                        "docile": []
                    }],
                    "min": 40,
                    "tutorials": []
            },
            {
                "id": 23,
                "traits": ["a", "t", "s", "l", "e", "b", "x", "d"],
                "populations":
                    [{
                        "combative": ["a"],
                        "docile": []
                    },
                    {
                        "combative": ["t"],
                        "docile": ["a"]
                    },
                    {
                        "combative": ["s"],
                        "docile": []
                    },
                    {
                        "combative": ["l"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["b"],
                        "docile": ["s"]
                    },
                    {
                        "combative": ["e"],
                        "docile": ["l","t"]
                    },
                    {
                        "combative": ["d"],
                        "docile": ["b","e"]
                    },
                    {
                        "combative": ["x"],
                        "docile": ["e"]
                    }],
                "query":
                    [{
                        "combative": ["a"],
                        "docile": ["t"]
                    },
                    {
                        "combative": ["s"],
                        "docile": ["b"]
                    },
                    {
                        "combative": ["x"],
                        "docile": []
                    },
                    {
                        "combative": ["d"],
                        "docile": []
                    }],
                    "min": 48,
                    "tutorials": ["z"]
            }
        ]
}

export function getPositionByLevelId(levelId) {
    var levels = getLevels();
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        if (level["id"]==levelId) {
            return i;
        }
    }
}

export function getLevelByPoistion(pos) {
    return getLevels()[pos];
}

export function getMinBestScore(levelId) {
    var levels = getLevels();
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        if (level["id"]==levelId) {
            return level["min"];
        }
    }
}
