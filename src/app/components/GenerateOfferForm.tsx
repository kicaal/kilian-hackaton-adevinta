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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const GenerateOfferForm = ({
  categories,
  salaryRange,
}: {
  categories: any;
  salaryRange: any;
}) => {
  const router = useRouter();

  const [categorySelected, setCategorySelected] = useState<string>(
    categories[0].id
  );
  const [subCategorySelected, setSubCategorySelected] = useState<string>("");
  const [subCategoryList, setSubCategoryList] = useState([]) as any;
  const [skills, setSkillsList] = useState<[]>([]);

  const [salaryFrom, setSalaryRangeFrom] = useState<string>("");
  const [salaryFromList, setSalaryFromList] = useState<[]>([]);
  const [salaryUntilList, setSalaryUntilList] = useState<[]>([]);
  const [salaryUntil, setSalaryRangeUntil] = useState<string>("");

  useEffect(() => {
    setSalaryFromList(salaryRange.filter((salary: any) => salary.order <= 500));
    setSalaryUntilList(salaryRange.filter((salary: any) => salary.order > 500));
  }, [salaryRange, salaryFrom]);

  useEffect(() => {
    const category = categories.find(
      (category: any) => category.id === categorySelected
    );

    if (category) {
      setSubCategoryList(category.subcategories);
    }
  }, [categories, categorySelected]);

  useEffect(() => {
    const subCategory = subCategoryList.find(
      (subCategory: any) => subCategory.id === subCategorySelected
    );

    if (subCategory) {
      setSkillsList(subCategory.skills);
    }
  }, [subCategoryList, subCategorySelected]);

  return (
    <div className="p-12 transition">
      <Card className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 items-center justify-center">
          <TextInput placeholder="Puesto de trabajo" />
          <TextInput placeholder="Experiencia mínima" />

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
            onValueChange={(value) =>
              console.log("The selected value is", value)
            }
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
            value=""
            placeholder="Requisitos específicos de la empresa"
            onChange={() => console.log("hola")}
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
            onValueChange={(value) =>
              console.log("The selected value is", value)
            }
            placeholder="Modalidad"
          >
            <SelectBoxItem value={"hybrid"} text="Hibrido" />
            <SelectBoxItem value={"remote"} text="Remoto" />
            <SelectBoxItem value={"office"} text="Oficina" />
          </SelectBox>
          <TextArea
            value=""
            placeholder="Beneficios sociales, seguro médico, plan de carrera adaptado..."
            onChange={() => console.log("hola")}
          />
          <Button
            onClick={() => router.push("/generate-offer/loading-description")}
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
