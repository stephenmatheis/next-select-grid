'use client';

import { ReactElement, useState, useCallback } from 'react';
import styles from './tabs.module.scss';

export type TabTitleProps = {
    title: string;
    index: number;
    setSelectedTab: (index: number) => void;
    isActive?: boolean;
};

function TabTitle(props: TabTitleProps): JSX.Element {
    const { title, setSelectedTab, index, isActive } = props;
    const ext = title.split('.').at(-1);

    const handleOnClick = useCallback(() => {
        setSelectedTab(index);
    }, [setSelectedTab, index]);

    return (
        <button
            className={[
                ...(isActive ? [styles.active] : []),
                styles.title,
            ].join(' ')}
            onClick={handleOnClick}
        >
            {(ext === 'jsx' || ext === 'js') && <span>JS</span>}
            {(ext === 'tsx' || ext === 'ts') && <span>TS</span>}
            {ext === 'html' && <span>{'<>'}</span>}
            {ext === 'css' && <span>{'#'}</span>}
            {ext === 'scss' && (
                <svg
                    version="1.1"
                    width="547.82666"
                    height="547.82666"
                    viewBox="0 0 547.82666 547.82666"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        id="g8"
                        transform="matrix(1.3333333,0,0,-1.3333333,0,547.82667)"
                    >
                        <g id="g10" transform="scale(0.1)">
                            <path
                                d="m 1646.09,1370.04 c 29.89,-110.56 26.61,-213.66 -4.26,-307.03 -3.43,-10.37 -7.21,-20.63 -11.31,-30.77 -4.1,-10.12 -8.54,-20.13 -13.3,-30.01 -23.81,-49.402 -55.76,-95.64 -94.89,-138.32 -119.36,-130.219 -286.13,-179.461 -357.64,-137.969 -77.22,44.758 -38.54,228.36 99.85,374.639 148.88,157.39 363.09,258.58 363.09,258.58 l -0.33,0.64 c 6.17,3.32 12.44,6.74 18.79,10.24 z m 1696.9,1859.38 c -93.03,364.86 -698.01,484.8 -1270.59,281.38 -340.75,-121.05 -709.64,-311.05 -974.88,-559.15 -315.368,-294.98 -365.661,-551.72 -344.93,-659 73.117,-378.54 591.79,-625.97 805.01,-809.55 v -1.11 C 1494.73,1451.04 1034.56,1218.16 926.871,980.078 813.242,728.91 944.957,548.672 1032.16,524.41 c 270.19,-75.172 547.45,60.039 696.45,282.289 143.79,214.481 131.82,491.441 69.33,629.211 86.2,22.74 186.69,32.93 314.4,18.01 360.37,-42.09 431.08,-267.11 417.56,-361.26 -13.51,-94.18 -89.1,-145.961 -114.37,-161.59 -25.28,-15.64 -32.99,-21.05 -30.86,-32.672 3.06,-16.898 14.76,-16.269 36.31,-12.617 29.66,5 189.23,76.598 196.05,250.429 8.69,220.7 -202.81,467.58 -577.3,461.13 -154.23,-2.66 -251.21,-17.33 -321.26,-43.4 -5.18,5.9 -10.45,11.77 -15.9,17.58 -231.52,247.01 -659.51,421.74 -641.36,753.81 6.6,120.72 48.56,438.61 822.39,824.21 633.9,315.86 1141.36,228.94 1229.06,36.3 125.27,-275.21 -271.21,-786.73 -929.52,-860.51 -250.81,-28.12 -382.87,69.09 -415.72,105.29 -34.59,38.11 -39.74,39.83 -52.65,32.68 -21.04,-11.65 -7.71,-45.3 0,-65.36 19.65,-51.15 100.31,-141.86 237.82,-186.98 120.96,-39.7 415.44,-61.51 771.57,76.24 398.85,154.29 710.31,583.47 618.83,942.22"
                                style={{
                                    // fill: '#c69',
                                    fill: 'inherit',
                                    fillOpacity: 1,
                                    fillRule: 'nonzero',
                                    stroke: 'none',
                                }}
                                id="path14"
                            />
                        </g>
                    </g>
                </svg>
            )}
            {title}
        </button>
    );
}

type TabProps = {
    title: string;
    children: ReactElement | ReactElement[];
};

export function Tab({ children }: TabProps): JSX.Element {
    return <div className={styles.tab}>{children}</div>;
}

type TabsProps = {
    children: ReactElement<TabTitleProps>[];
    preSelectedTabIndex?: number;
};

export function Tabs({
    children,
    preSelectedTabIndex: index,
}: TabsProps): JSX.Element {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
        index || 0
    );

    return (
        <div className={styles.tabs}>
            <div className={styles.titles}>
                {children.map(({ props }, index) => (
                    <TabTitle
                        key={props.title}
                        title={props.title}
                        index={index}
                        isActive={index === selectedTabIndex}
                        setSelectedTab={setSelectedTabIndex}
                    />
                ))}
            </div>
            {children[selectedTabIndex]}
        </div>
    );
}
