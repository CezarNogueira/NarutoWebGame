#!/bin/bash
# Insert nature choice below village
awk '
/Escolha sua Aldeia Oculta/ { inside_village = 1 }
/<\/div>/ && inside_village {
    div_count++
    if (div_count == 2) {
        print $0
        print ""
        print "            <div>"
        print "              <label className=\"block text-sm font-medium text-neutral-300 mb-2\">Natureza de Chakra</label>"
        print "              <div className=\"grid grid-cols-2 sm:grid-cols-5 gap-3\">"
        print "                {(\"Fogo Água Vento Raio Terra\").split(\" \").map((n) => ("
        print "                  <button"
        print "                    key={n}"
        print "                    onClick={() => setNature(n as any)}"
        print "                    className={`p-3 rounded-lg border-2 text-center transition-all ${nature === n ? \"border-white bg-neutral-800\" : \"border-neutral-800 bg-neutral-900 hover:border-neutral-600\"}`}"
        print "                  >"
        print "                    <span className=\"font-semibold\">{n}</span>"
        print "                  </button>"
        print "                ))}"
        print "              </div>"
        print "            </div>"
        inside_village = 0
        next
    }
}
{ print $0 }
' src/App.tsx > temp.tsx && mv temp.tsx src/App.tsx
