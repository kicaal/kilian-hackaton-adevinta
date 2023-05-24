"use client";

import {
  Button,
  Card,
  SelectBox,
  SelectBoxItem,
  MultiSelectBox,
  MultiSelectBoxItem,
  Divider,
} from "@tremor/react";
import { TextInput } from "@tremor/react";
import { TextArea } from "../components/Textarea";
import { useEffect, useState } from "react";
import { useOfferContext } from "../hooks/OfferProvider";

export const GenerateOfferForm = () => {
  const {
    categories,
    salaryRange,
    createOffer,
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
    salaryFrom,
    setSalaryRangeFrom,
    salaryUntil,
    setSalaryRangeUntil,
  } = useOfferContext();

  const [subCategoryList, setSubCategoryList] = useState([]) as any;
  const [skills, setSkillsList] = useState<[]>([]);
  const [salaryFromList, setSalaryFromList] = useState<[]>([]);
  const [salaryUntilList, setSalaryUntilList] = useState<[]>([]);

  useEffect(() => {
    if (categories.length) {
      setCategorySelected(categories[0].id);
    }
  }, [categories, setCategorySelected]);

  useEffect(() => {
    setSalaryFromList(salaryRange);
  }, [salaryRange]);

  useEffect(() => {
    const salaryFromObject = salaryRange.find((salary: any) => {
      if (salary.key === salaryFrom) {
        return salary;
      }
    });
    if (salaryFromObject) {
      setSalaryUntilList(
        salaryRange.filter(
          (salary: any) => salary.order > salaryFromObject.order
        )
      );
    } else {
      setSalaryUntilList(salaryRange);
    }
  }, [salaryRange, salaryFrom]);

  useEffect(() => {
    const category = categories.find(
      (category: any) => category.id === categorySelected
    );

    if (category) {
      setSubCategoryList(category.subcategories);
      setSubCategorySelected(category.subcategories[0].id);
      setSkillSelected([]);
    }
  }, [categories, categorySelected, setSubCategorySelected, setSkillSelected]);

  useEffect(() => {
    const subCategory = subCategoryList.find(
      (subCategory: any) => subCategory.id === subCategorySelected
    );

    if (subCategory) {
      setSkillSelected([]);
      setSkillsList(subCategory.skills);
    }
  }, [subCategoryList, subCategorySelected, setSkillSelected]);

  return (
    <div className="p-12 transition">
      <Card className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-full">
            <TextInput
              onChange={(e) => setOfferName(e.target.value)}
              value={offerName}
              // error
              // errorMessage="Obligatorio"
              placeholder="Puesto de trabajo"
            />
          </div>
          <TextInput
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
            placeholder="Experiencia mínima"
          />

          <SelectBox
            value={categorySelected}
            onValueChange={(value) => setCategorySelected(value)}
            placeholder="Categoría"
          >
            {categories.map((category: any) => {
              return (
                <SelectBoxItem
                  key={category.id}
                  value={category.id}
                  text={category.name}
                />
              );
            })}
          </SelectBox>
          <SelectBox
            value={subCategorySelected}
            onValueChange={setSubCategorySelected}
            placeholder="Subcategoría"
          >
            {subCategoryList.map((subCategory: any) => {
              return (
                <SelectBoxItem
                  key={subCategory.id}
                  value={subCategory.id}
                  text={subCategory.name}
                />
              );
            })}
          </SelectBox>
          <MultiSelectBox
            onValueChange={(value) => setSkillSelected(value)}
            value={skillSelected}
            placeholder="Conocimientos requeridos"
          >
            {skills.map((skill: any) => {
              return (
                <MultiSelectBoxItem
                  key={skill.id}
                  value={skill.id}
                  text={skill.name}
                />
              );
            })}
          </MultiSelectBox>
          <TextArea
            value={requirements}
            placeholder="Requisitos específicos de la empresa"
            onChange={(e) => setRequirements(e.target.value)}
          />
          <Divider />
          <div className="flex gap-6 w-full">
            <SelectBox
              value={salaryFrom}
              onValueChange={setSalaryRangeFrom}
              placeholder="Rango salarial desde"
            >
              {salaryFromList.map((salary: any) => {
                return (
                  <SelectBoxItem
                    key={salary.id}
                    value={salary.key}
                    text={salary.value}
                  />
                );
              })}
            </SelectBox>
            <SelectBox
              value={salaryUntil}
              onValueChange={setSalaryRangeUntil}
              placeholder="Rango salarial hasta"
            >
              {salaryUntilList.map((salary: any) => {
                return (
                  <SelectBoxItem
                    key={salary.id}
                    value={salary.key}
                    text={salary.value}
                  />
                );
              })}
            </SelectBox>
          </div>
          <SelectBox
            onValueChange={setModality}
            value={modality}
            placeholder="Modalidad"
          >
            <SelectBoxItem value={"Hibrido"} text="Hibrido" />
            <SelectBoxItem value={"Remoto"} text="Remoto" />
            <SelectBoxItem value={"Oficina"} text="Oficina" />
          </SelectBox>
          <TextArea
            value={socialBenefits}
            placeholder="Beneficios sociales, seguro médico, plan de carrera adaptado..."
            onChange={(e) => setSocialBenefits(e.target.value)}
          />
          <Button
            onClick={() => createOffer()}
            loading={false}
            className="self-end"
          >
            Generar oferta
          </Button>
        </div>
      </Card>
    </div>
  );
};
