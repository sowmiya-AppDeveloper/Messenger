if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/bi1466/.gradle/caches/transforms-3/963d84933b869ef7ae0d2bfe84a9cfb8/transformed/jetified-hermes-android-0.73.6-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/bi1466/.gradle/caches/transforms-3/963d84933b869ef7ae0d2bfe84a9cfb8/transformed/jetified-hermes-android-0.73.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

