"use client";

import {
  Button,
  Card,
  SelectBox,
  SelectBoxItem,
  MultiSelectBox,
  MultiSelectBoxItem,
  Divider,
  Text,
  Callout,
} from "@tremor/react";
import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useOfferContext } from "../hooks/OfferProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextArea from "./Textarea";
import { InformationCircleIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation";

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

const schema = yup.object().shape({
  offerName: yup.string().required("Nombre del puesto es requerido"),
  experience: yup.string().required("La experiencia es requerida"),
  category: yup.string().required(),
  subCategory: yup.string().required(),
  maxSalaryRange: yup.string().required(),
  minSalaryRange: yup.string().required(),
  modality: yup.string().required(),
  requirements: yup
    .string()
    .required(
      "Ofrece algún tipo de información específica de tu empresa para afinar la oferta"
    ),
  socialBenefits: yup.string(),
});

export const GenerateOfferForm = () => {
  const router = useRouter();

  const {
    categories,
    salaryRange,
    createOffer,
    skillSelected,
    setSkillSelected,
  } = useOfferContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [minSalaryRange, categorySelected, subCategorySelected] = watch([
    "minSalaryRange",
    "category",
    "subCategory",
  ]);

  const [subCategoryList, setSubCategoryList] = useState([]) as any;
  const [skills, setSkillsList] = useState<[]>([]);
  const [salaryFromList, setSalaryFromList] = useState<[]>([]);
  const [salaryUntilList, setSalaryUntilList] = useState<[]>([]);

  useEffect(() => {
    setSalaryFromList(salaryRange);
  }, [salaryRange]);

  useEffect(() => {
    const salaryFromObject = salaryRange.find((salary: any) => {
      if (salary.key === minSalaryRange) {
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
  }, [salaryRange, minSalaryRange]);

  useEffect(() => {
    const category = categories.find(
      (category: any) => category.id === categorySelected
    );

    if (category) {
      setSubCategoryList(category.subcategories);
      setValue("subCategory", category.subcategories[0].id);
      setSkillSelected([]);
    }
  }, [categories, categorySelected, setValue, setSkillSelected]);

  useEffect(() => {
    const subCategory = subCategoryList.find(
      (subCategory: any) => subCategory.id === subCategorySelected
    );

    if (subCategory) {
      setSkillSelected([]);
      setSkillsList(subCategory.skills);
    }
  }, [subCategoryList, subCategorySelected, setSkillSelected]);

  const onSubmit = async (data: FormData) => await createOffer(data);

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="light"
          icon={ArrowLeftIcon}
        >
          Volver
        </Button>
        <div className="flex flex-col gap-2">
          <Text className="text-xl">
            Genera una oferta de trabajo en base a tus necesidades y requisitos.
          </Text>
          <Callout
            icon={InformationCircleIcon}
            title="Rellena los campos necesarios para obtener una oferta"
            color="blue"
          >
            ¡Recuerda! Cuanta más información proporciones mejor será la oferta
          </Callout>
        </div>
        <Divider />
        <Text className="text-lg">Requisitos mínimos del candidato</Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 items-center justify-center"
        >
          <div className="w-full flex flex-col md:flex-row items-start gap-6">
            <div className="w-full">
              <TextInput
                {...register("offerName")}
                error={!!errors.offerName}
                errorMessage={errors?.offerName?.message as string}
                placeholder="Desarrollador web"
              />
            </div>
            <div className="w-full">
              <TextInput
                {...register("experience")}
                error={!!errors.experience}
                errorMessage={errors?.experience?.message as string}
                placeholder="Experiencia mínima"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <SelectBox
              {...register("category")}
              onValueChange={(value) => setValue("category", value)}
              placeholder="Categoría"
            >
              {categories.map((category: { id: string; name: string }) => {
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
              {...register("subCategory")}
              value={subCategorySelected}
              onValueChange={(value) => setValue("subCategory", value)}
              placeholder="Subcategoría"
            >
              {subCategoryList.map(
                (subCategory: { id: string; name: string }) => {
                  return (
                    <SelectBoxItem
                      key={subCategory.id}
                      value={subCategory.id}
                      text={subCategory.name}
                    />
                  );
                }
              )}
            </SelectBox>
            <MultiSelectBox
              onValueChange={(value) => setSkillSelected(value)}
              value={skillSelected}
              placeholder="Conocimientos requeridos"
            >
              {skills.map((skill: { id: string; name: string }) => {
                return (
                  <MultiSelectBoxItem
                    key={skill.id}
                    value={skill.id}
                    text={skill.name}
                  />
                );
              })}
            </MultiSelectBox>
          </div>
          <TextArea
            {...register("requirements")}
            placeholder="Requisitos específicos de la empresa"
          />
          <Divider className="!my-0" />
          <Text className="w-full text-lg text-left leading-4">
            Oferta hacia el candidato
          </Text>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <SelectBox
              {...register("minSalaryRange")}
              onValueChange={(value) => setValue("minSalaryRange", value)}
              placeholder="Rango salarial desde"
            >
              {salaryFromList.map(
                (salary: { id: string; key: string; value: string }) => {
                  return (
                    <SelectBoxItem
                      key={salary.id}
                      value={salary.key}
                      text={salary.value}
                    />
                  );
                }
              )}
            </SelectBox>
            <SelectBox
              {...register("maxSalaryRange")}
              onValueChange={(value) => setValue("maxSalaryRange", value)}
              placeholder="Rango salarial hasta"
            >
              {salaryUntilList.map(
                (salary: { id: string; key: string; value: string }) => {
                  return (
                    <SelectBoxItem
                      key={salary.id}
                      value={salary.key}
                      text={salary.value}
                    />
                  );
                }
              )}
            </SelectBox>
          </div>
          <SelectBox
            {...register("modality")}
            onValueChange={(value) => setValue("modality", value)}
            placeholder="Modalidad"
          >
            <SelectBoxItem value={"Hibrido"} text="Hibrido" />
            <SelectBoxItem value={"Remoto"} text="Remoto" />
            <SelectBoxItem value={"Oficina"} text="Oficina" />
          </SelectBox>
          <TextArea
            {...register("socialBenefits")}
            placeholder="Cultura de empresa, beneficios sociales, seguro médico, plan de carrera adaptado..."
          />
          <Button
            type="submit"
            loading={false}
            className="w-full md:w-auto self-end"
          >
            Generar oferta
          </Button>
        </form>
      </Card>
    </div>
  );
};
