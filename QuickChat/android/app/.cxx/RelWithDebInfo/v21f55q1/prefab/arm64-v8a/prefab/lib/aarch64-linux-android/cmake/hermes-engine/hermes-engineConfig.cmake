if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/bi1466/.gradle/caches/transforms-3/8f7710dd80d1503f9787f7ee35edf7eb/transformed/jetified-hermes-android-0.73.4-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/bi1466/.gradle/caches/transforms-3/8f7710dd80d1503f9787f7ee35edf7eb/transformed/jetified-hermes-android-0.73.4-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

