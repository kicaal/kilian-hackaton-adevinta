import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const OfferContext = createContext<{
  offer: string;
  offerName: string;
  setOfferName: (value: string) => void;
  experience: string;
  setExperience: (value: string) => void;
  categorySelected: string;
  setCategorySelected: (value: string) => void;
  subCategorySelected: string;
  setSubCategorySelected: (value: string) => void;
  skillSelected: string[];
  setSkillSelected: (value: string[]) => void;
  requirements: string;
  setRequirements: (value: string) => void;
  modality: string;
  setModality: (value: string) => void;
  socialBenefits: string;
  setSocialBenefits: (value: string) => void;
  salaryFrom: string;
  setSalaryRangeFrom: (value: string) => void;
  salaryUntil: string;
  setSalaryRangeUntil: (value: string) => void;
  categories: any;
  salaryRange: any;
  createOffer: Function;
  setIsLoading: Function;
  isLoading: Boolean;
}>({
  offer: "",
  salaryFrom: "",
  setSalaryRangeFrom: () => {},
  salaryUntil: "",
  setSalaryRangeUntil: () => {},
  offerName: "",
  setOfferName: () => {},
  experience: "",
  setExperience: () => {},
  categorySelected: "",
  setCategorySelected: () => {},
  subCategorySelected: "",
  setSubCategorySelected: () => {},
  skillSelected: [],
  setSkillSelected: () => {},
  requirements: "",
  setRequirements: () => {},
  modality: "",
  setModality: () => {},
  socialBenefits: "",
  setSocialBenefits: () => {},
  categories: [],
  salaryRange: [],
  createOffer: () => {},
  setIsLoading: () => {},
  isLoading: false,
});

export const OfferProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [offer, setOffer] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [offerName, setOfferName] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [subCategorySelected, setSubCategorySelected] = useState<string>("");
  const [skillSelected, setSkillSelected] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string>("");
  const [modality, setModality] = useState<string>("");
  const [socialBenefits, setSocialBenefits] = useState<string>("");
  const [salaryFrom, setSalaryRangeFrom] = useState<string>("");
  const [salaryUntil, setSalaryRangeUntil] = useState<string>("");

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

  const createOffer = async () => {
    const category: any = categories.find(
      (category: any) => category.id === categorySelected
    );

    const subCategory: any = category?.subcategories.find(
      (subCategory: any) => subCategory.id === subCategorySelected
    );

    const skills = subCategory?.skills.reduce((acc: string[], skill: any) => {
      if (skillSelected.includes(skill.id)) {
        acc.push(skill.name);
      }
      return acc;
    }, []);

    const data = {
      offerName,
      experience,
      category: category.name,
      skills: skills?.join(", "),
      subCategory: subCategory.name,
      requirements,
      modality,
      socialBenefits,
      salaryFrom,
      salaryUntil,
    };

    const prompt = `${data.offerName} Experiencia mínima ${data.experience} categoría ${data.category} especializado en ${data.subCategory}, las skills mínimas requeridas son ${data.skills}, los requerimientos específicos son ${requirements}  el rango salarial es de entre ${salaryFrom}€ y ${salaryUntil}€ modalidad ${data.modality} como benificios sociales ${data.socialBenefits}"`;

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

    router.push("/generate-offer/description");

    setIsLoading(false);
  };

  return (
    <OfferContext.Provider
      value={{
        offer,
        salaryFrom,
        setSalaryRangeFrom,
        salaryUntil,
        setSalaryRangeUntil,
        offerName,
        setOfferName,
        experience,
        setExperience,
        categorySelected,
        setCategorySelected,
        subCategorySelected,
        setSubCategorySelected,
        skillSelected,
        setSkillSelected,
        requirements,
        setRequirements,
        modality,
        setModality,
        socialBenefits,
        setSocialBenefits,
        categories,
        salaryRange,
        createOffer,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  return useContext(OfferContext);
};
