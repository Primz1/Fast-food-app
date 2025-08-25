import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';

const ITEM_WIDTH = 100; // approximate width used for scrolling math

const Filter = ({ categories }: { categories: Category[] }) => {
    const searchParams = useLocalSearchParams();
    const paramCategory = Array.isArray(searchParams.category) ? searchParams.category[0] : (searchParams.category ?? 'all');

    const [active, setActive] = useState<string>(paramCategory || 'all');
    const listRef = useRef<FlatList<any> | null>(null);

    // keep active in sync when route params change externally
    useEffect(() => {
        setActive(paramCategory || 'all');
    }, [paramCategory]);

    const handlePress = (id: string) => {
        setActive(id);
        if(id === 'all') router.setParams({ category: undefined });
        else router.setParams({ category: id });
    };

    const filterData = useMemo(() => (
        categories && categories.length > 0 ? [{ $id: 'all', name: 'All' }, ...categories] : [{ $id: 'all', name: 'All' }]
    ), [categories]);

    // when active changes, scroll the list so the active item is visible
    useEffect(() => {
        if (!listRef.current) return;
        const idx = filterData.findIndex((f) => f.$id === active);
        if (idx === -1) return;
        try {
            listRef.current.scrollToIndex({ index: idx, animated: true, viewPosition: 0.5 });
        } catch (e) {
            // silent - sometimes index measurement isn't ready
        }
    }, [active, filterData]);

    return (
        <FlatList
            ref={listRef}
            data={filterData}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-x-2 pb-3"
            getItemLayout={(_, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className={cn('filter', active === item.$id ? 'bg-amber-500' : 'bg-white')}
                    style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787'} : {}}
                    onPress={() => handlePress(item.$id)}
                >
                    <Text className={cn('body-medium', active === item.$id ? 'text-white' : 'text-gray-200')}>{item.name}</Text>
                </TouchableOpacity>
            )}
            initialNumToRender={10}
            removeClippedSubviews
        />
    )
}
export default React.memo(Filter);