import { ParagraphBold, ParagraphSemibold, Title } from "../../../styled-components/text";
import { Text, TouchableOpacity, View } from "react-native";

import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

function ProductItem({ props }: any) {
    const { item, qtt_items, width } = props;
    return (
        <View
            className={`bg-white overflow-hidden rounded-sm`}
            style={{ width: width, aspectRatio: 1, marginRight: 8 }}
        >
            <Text
                className={`
                        rounded-sm bg-slate-950 px-1 text-xs absolute z-10 font-semibold text-center text-white border border-neutral-300
                    `}>
                {qtt_items}
            </Text>
            <Image className={`object-contain w-100 h-100`}
                style={{ width: '100%', height: '100%' }}
                source={{ uri: item?.url_img }}
            />
        </View>
    )
}

interface ErrorIndicatorProps {
    onReload: () => void;
    errorText: string
}

const ErrorIndicator = ({ onReload, errorText }: ErrorIndicatorProps) => {
    return (
        <View className="flex items-center p-2">
            <Text className="font-semibold text-center text-[14px]">{errorText}</Text>
            <TouchableOpacity onPress={onReload} className="p-2 rounded-md bg-red-400 mt-3">
                <Text style={{ color: '#fff', fontSize: 16 }}>Recarregar</Text>
            </TouchableOpacity>
        </View>
    );
}

export function Purchase({ data, title, cta, date }: any) {
    return (
        <>
            {
                data ? (
                    <>
                        <View className={`flex flex-row justify-between items-center p-2 pt-1`}>
                            {title}
                            <ParagraphSemibold>
                                {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
                            </ParagraphSemibold>
                        </View>
                        <ScrollView
                            style={{ marginHorizontal: -10 }}
                            horizontal
                            decelerationRate="normal"
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 16, paddingRight: 10 }}
                        >
                            <View style={{ flexDirection: 'row', position: 'relative', zIndex: 1 }}>
                                {data.items.map((item: any, index: number) => (
                                    <ProductItem key={index} props={{ item: item.product, qtt_items: item.qtt_items, width: 100 }} />
                                ))}
                            </View>
                        </ScrollView>
                        <View className={`flex-row justify-between items-center p-2 pb-1`}>
                            <ParagraphSemibold className="">Total:<ParagraphBold className="semibold"> R$ {data.total}</ParagraphBold></ParagraphSemibold>
                            {cta}
                        </View>
                    </>
                ) : (
                    <>
                        {/* <ErrorIndicator
                            onReload={() => dispatch(loadPurchaseAsync())}
                            errorText={"Ocorreu um erro ao carregar a sua última compra."}
                        /> */}
                    </>
                )}
        </>
    )
}

