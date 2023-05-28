import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type FormData = {
  offerName: string;
  category: string;
  experience: string;
  subCategory: string;
  requirements: string;
  minSalaryRange: string;
  maxSalaryRange: string;
  modality: string;
  socialBenefits: string;
};

const OfferContext = createContext<{
  offer: string;
  categories: any;
  salaryRange: any;
  createOffer: Function;
  checkOffer: Function;
  setIsLoading: Function;
  isLoading: Boolean;
  skillSelected: any;
  setSkillSelected: Function;
  offerReccomendations: {
    score: number;
    message: string;
  };
  setOffer: Function;
  convertToHtml: Function;
}>({
  offer: "",
  offerReccomendations: { score: 0, message: "" },
  categories: [],
  salaryRange: [],
  createOffer: () => {},
  checkOffer: () => {},
  setIsLoading: () => {},
  skillSelected: [],
  setSkillSelected: () => {},
  setOffer: () => {},
  isLoading: false,
  convertToHtml: () => {},
});

export const OfferProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [offer, setOffer] = useState<string>("");

  const [offerReccomendations, setOfferRecommendations] = useState<{
    score: number;
    message: string;
  }>({ score: 0, message: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [skillSelected, setSkillSelected] = useState<string[]>([]);

  const [categories, setCategories] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);

  const getCandidateOffer = async () => {
    const res = await fetch(`/api/candidate-offer/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCategories(await res.json());
  };

  const getSalaryRange = async () => {
    const res = await fetch(`/api/salary-range/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSalaryRange(await res.json());
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getSalaryRange();
      await getCandidateOffer();
      setIsLoading(false);
    };

    loadData();
  }, []);

  const createOffer = async (data: FormData) => {
    const {
      offerName,
      category: categorySelected,
      experience,
      subCategory: subCategorySelected,
      requirements,
      minSalaryRange,
      maxSalaryRange,
      modality,
      socialBenefits,
    } = data;

    const category: any = categories.find(
      (category: any) => category.id === Number(categorySelected)
    );

    const subCategory: any = category?.subcategories.find(
      (subCategory: any) => subCategory.id === Number(subCategorySelected)
    );

    const skills = subCategory?.skills.reduce((acc: string[], skill: any) => {
      if (skillSelected.includes(skill.id)) {
        acc.push(skill.name);
      }
      return acc;
    }, []);

    const selectedData = {
      offerName,
      experience: `Experiencia mínima ${experience}`,
      category: `categoría ${category.name}`,
      subCategory: `especializado en ${subCategory.name}`,
      skills: skills.length
        ? `las skills mínimas requeridas son ${skills?.join(", ")}`
        : "",
      requirements: requirements
        ? `los requerimientos específicos son ${requirements}`
        : "",
      salaryRange: `el rango salarial es de entre ${minSalaryRange}€ y ${maxSalaryRange}€`,
      modality: `modalidad ${modality}`,
      socialBenefits: socialBenefits
        ? `como benificios sociales ${socialBenefits}`
        : "",
    };

    const prompt = `${selectedData.offerName} ${selectedData.experience} ${selectedData.category} ${selectedData.subCategory}, ${selectedData.skills} ${selectedData.requirements} ${selectedData.salaryRange} ${selectedData.socialBenefits}`;

    setIsLoading(true);
    const res = await fetch(`/api/create-offer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: prompt,
      }),
    });

    const resJson = await res.json();

    setOffer(resJson);

    router.push("/offer");

    setIsLoading(false);
  };

  const checkOffer = async (prompt: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/check-offer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: prompt,
      }),
    });

    const resJson = await res.json();

    setOfferRecommendations(resJson);

    setIsLoading(false);
  };

  const convertToHtml = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/convert-to-html/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: offer,
      }),
    });

    const resJson = await res.json();
    setIsLoading(false);
    return resJson;
  };

  return (
    <OfferContext.Provider
      value={{
        offer,
        setOffer,
        skillSelected,
        setSkillSelected,
        categories,
        salaryRange,
        createOffer,
        isLoading,
        setIsLoading,
        checkOffer,
        convertToHtml,
        offerReccomendations,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  return useContext(OfferContext);
};
