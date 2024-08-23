// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const randomBaseIndex = Math.floor(Math.random() * this.dna.length);
      const generatedBase = returnRandBase();

      if (this.dna[randomBaseIndex] === generatedBase) {
        console.log(
          `pAequorFactory.mutate() - The new DNA base '${generatedBase}' is identical to the current base '${this.dna[randomBaseIndex]}' and does not need changes.\n`
        );
      } else {
        console.log(
          `----------------\nOriginal DNA base: ${this.dna[randomBaseIndex]} at index: ${randomBaseIndex}`
        );
        this.dna[randomBaseIndex] = generatedBase;
        console.log(
          `Newly inserted DNA base: ${this.dna[randomBaseIndex]} at index ${randomBaseIndex}\n----------------\n`
        );
      }
      return this.dna;
    },
    compareDNA(object) {
      console.log(`My DNA sequence:              ${this.dna}`);
      console.log(`Other specimens DNA sequence: ${object.dna}`);

      if (this.dna === object.dna) {
        console.log(
          `Specimen ${object.specimenNum} has an identical DNA sequence.`
        );
      } else {
        let identicalBases = 0;

        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === object.dna[i]) {
            identicalBases++;
          }
        }

        console.log(
          `Total DNA in common between specimen ${
            this.specimenNum
          } and specimen ${object.specimenNum}: ${(
            identicalBases / this.dna.length * 100
          ).toFixed(2)}%`
        );
      }
    },
    willLikelySurvive(object) {
      let desiredBases = 0;
      for (let i = 0; i  < object.dna.length; i++) {
        if (object.dna[i] === 'C' || object.dna[i] === 'G') {
          desiredBases++;
        }
      }

      if ((desiredBases / object.dna.length * 100) > 60)  {
        return true;
      } else {
        return false;
      }
    },
  };
};

const specimen = pAequorFactory(1, mockUpStrand());
console.log("Original DNA:", specimen.dna.join("") + "\n");
const mutatedDna = specimen.mutate();
console.log("Mutated DNA: ", mutatedDna.join("") + "\n");

const specimen2 = pAequorFactory(7, mockUpStrand());

specimen.compareDNA(specimen2);
console.log(specimen.willLikelySurvive(specimen));


let willTheySurvive = false;
let arrayOfSurvivors = [];
let iter = 1;
while (arrayOfSurvivors.length < 30) {
  let specimenToCheck = pAequorFactory(iter, mockUpStrand());
  willTheySurvive = specimenToCheck.willLikelySurvive(specimenToCheck);
  if (willTheySurvive) {
    arrayOfSurvivors.push(specimenToCheck);
    iter++;
  }
}
console.log(arrayOfSurvivors);
